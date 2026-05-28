export const askConfig = {
    defaultName: "you",

    landing: {
        question: "Mache will you go on a date with me???",
        yesLabel: "Yes! 🥰",
        noLabel: "No…",
        gif: "/gifs/kitten-sitting.gif",
    },

    yesReactionGif: "/gifs/kitten-jumping.gif",

    steps: {
        date: {
            heading: "Pick a day!",
            subheading: "When are you free? 🗓️",
        },
        type: {
            heading: "What kind of date?",
            subheading: "Pick one that sounds fun 💑",
            options: [
                { emoji: "🍝", label: "Dinner" },
                { emoji: "🎬", label: "Movie" },
                { emoji: "☕", label: "Coffee" },
                { emoji: "🧺", label: "Picnic" },
                { emoji: "🏕️", label: "Weekend Getaway" },
                { emoji: "❓", label: "Leave it to me" },
            ] as const,
        },
        note: {
            heading: "Leave a little note?",
            subheading: "its optional :)",
            placeholder: "Can't wait to see you 🥺",
        },
    },

    transitionGif: "/gifs/kitten-paw.gif",

    confirmation: {
        heading: "It's a date!! 🎉",
        subheading: "love u mache <3",
        gif: "/gifs/kitten-celebration.gif",
        copyLabel: "📋 Copy message",
        confirmLabel: "✉️ Confirm & send",
        // Email the confirmation gets sent to when "Confirm" is clicked.
        // Replace with your real email address.
        recipientEmail: "petkovm22@gmail.com",
        emailSubject: "It's a date! 🎉",
        // {date}, {type}, {note} replaced at runtime.
        // "\n💌 {note}" line is dropped entirely when note is empty.
        messageTemplate:
            "🐱 Yes!! I'd love to go on a date!\n📅 {date}\n{type}\n💌 {note}",
    },
} as const;

export type DateTypeOption = (typeof askConfig.steps.type.options)[number];
