import mongoose from "mongoose";
import Channel from "../models/ChannelModel.js";
import User from "../models/UserModel.js";

const WORDS = [
    "shadow","ghost","storm","blaze","frost","echo","nova","pixel","comet","vortex",
    "cipher","delta","ember","falcon","glitch","haze","iris","joker","karma","lunar",
    "mirage","nexus","orbit","prism","quasar","raven","sonic","titan","ultra","vapor",
    "wolf","xenon","yeti","zenith","atom","byte","cloud","drift","enigma","flux"
];

function generatePseudonym(usedSet) {
    let name;
    let attempts = 0;
    do {
        const word = WORDS[Math.floor(Math.random() * WORDS.length)];
        const num = Math.floor(Math.random() * 900) + 100; // 100-999
        name = `${word}${num}`;
        attempts++;
    } while (usedSet.has(name) && attempts < 500);
    usedSet.add(name);
    return name;
}


export const CreateChannel = async (request,response,next) =>{
    try {
     const {name,members,type} = request.body;
     const userId = request.userId;

     const admin = await User.findById(userId);

     if(!admin){
        return response.status(400).send("Admin user not found");
     }

     const validMembers = await User.find({ _id: { $in: members }});

     if(validMembers.length !== members.length){
        return response.status(400).send("Some members are not valid users");
     }

     const newChannel = new Channel({
        name,
        members,
        type,
        admin: userId,
     });

     if (type === "anonymous") {
        const usedSet = new Set();
        const allParticipants = [userId.toString(), ...members.map(m => m.toString())];
        const map = {};
        for (const id of allParticipants) {
            map[id] = generatePseudonym(usedSet);
        }
        newChannel.pseudonymMap = map;
     }

     await newChannel.save();
     return response.status(200).json({ channel: newChannel })

    } catch (error) {
      console.log({error});
      return response.status(500).send("Internal Server ERROR")
    }
}
export const getUserChannels = async (request,response,next) =>{
    try {
     const userId = new mongoose.Types.ObjectId(request.userId);
     const channels = await Channel.find({
      $or: [{ admin: userId}, {members: userId}],
     }).sort({ updatedAt: -1 })
    
     return response.status(200).json({ channels })
    } catch (error) {
      console.log({error});
      return response.status(500).send("Internal Server ERROR")
    }
}

export const getChannelMessages = async (request,response,next) =>{
    try {
    const {channelId} = request.params;
    const requesterId = request.userId;

    const channel = await Channel.findById(channelId).populate({
      path: "messages",
      populate: {
         path:"sender",
         select: "firstName lastName email _id image color",
      },
    });

    if(!channel){
      return response.status(404).send("Channel not found");
    };

    const isAdmin = channel.admin.toString() === requesterId;
    const isAnonymous = channel.type === "anonymous";

    let messages = channel.messages;

    if (isAnonymous) {
        messages = messages.map((msg) => {
            const senderId = msg.sender._id.toString();
            const pseudonym = channel.pseudonymMap.get(senderId) || "unknown";
            if (isAdmin) {
                // admin sees pseudonym + real info
                return { ...msg._doc, pseudonym };
            } else {
                // members see only pseudonym, no real identity
                return {
                    ...msg._doc,
                    sender: {
                        _id: msg.sender._id,
                        firstName: pseudonym,
                        lastName: "",
                        email: "",
                        image: null,
                        color: null,
                    },
                    pseudonym,
                };
            }
        });
    }

     return response.status(200).json({ messages })
    } catch (error) {
      console.log({error});
      return response.status(500).send("Internal Server ERROR")
    }
}
