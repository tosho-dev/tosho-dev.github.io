import { useEffect, useRef, useState } from "react"

const datasets = [
    "Tosho",
    "Libros",
    "Livres",
    "Bücher",
    "Libri",
    "Livros",
    "Книги",
    "书籍",
    "図書",
    "책",
    "كُتُب",
    "पुस्तकें",
    "বই",
    "کتب",
    "Kitaplar",
    "Boeken",
    "Książki",
    "Sách",
    "หนังสือ",
    "Buku",
    "Mga Aklat",
    "Книги",
    "کتاب‌ها",
    "Βιβλία",
    "Knihy",
    "Böcker",
    "Cărți",
    "Könyvek",
    "Bøger",
    "Kirjat",
    "Bøker",
    "Raamatud",
    "Grāmatas",
    "Libra",
    "წიგნები",
    "Գրքեր",
    "Kitablar",
    "Кнігі",
    "Књиге",
    "Knjige",
    "Knygos",
    "Knjige",
    "Knihi",
    "Ts'ignebi",
    "Kitaptar",
    "Китаптар",
    "Китептер",
    "Книги",
    "Kitobho",
    "Kitoblar",
    "Kitoblar",
    "Liburuak",
    "Llyfrau",
]

function getShuffledDatasets() {
    const copyData = [...datasets];
    // pop `tosho`
    copyData.shift();
    // shuffle the rest
    const shuffledData = copyData.sort(() => Math.random() - 0.5);
    // add `tosho` back to the front
    shuffledData.unshift(datasets[0]);
    return shuffledData;
}

function scrambleText(text: string) {
    const letters = "abcdefghijklmnopqrstuvwxyz#%&^+=-";
    let newString = "";
    for (let i = 0; i < text.length; i++) {
        if (Math.random() > 0.5) {
            newString += letters[Math.floor(Math.random() * letters.length)];
        } else {
            newString += text[i];
        }
    }
    return newString;
}

function TextShuffler(props: { text: string }) {
    // Create a reveal effect for the whole text
    // duration of 1s, if text is too short, do 200ms
    const reference = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (reference.current) {
            let start: number;
            let actualStart: number;

            // 1s for 5 characters, 200ms for 1 character
            // the longer the text, the longer the duration
            const duration = props.text.length * 150;

            function step(timestamp: number) {
                if (!start) {
                    start = timestamp;
                    actualStart = timestamp;
                }

                const elapsed = timestamp - start;
                const actualElapsed = timestamp - actualStart;

                // shuffle every 50ms
                if (reference.current && elapsed > 50) {
                    reference.current.textContent = scrambleText(props.text);
                    start = timestamp;
                }

                // stop after 1s
                if (actualElapsed < duration) {
                    window.requestAnimationFrame(step);
                } else {
                    if (reference.current) {
                        reference.current.textContent = props.text;
                    }
                }
            }

            window.requestAnimationFrame(step);

        }
    }, [reference, props.text]);

    return (
        <span ref={reference}>{scrambleText(props.text)}</span>
    )

}

export default function ToshoText() {
    const shuffledDatasets = getShuffledDatasets();
    const [currentText, setCurrentText] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // cycle through the dataset
            // if we reach the end, start over
            const nextIndex = currentText + 1;

            if (nextIndex < datasets.length) {
                setCurrentText(nextIndex);
            } else {
                setCurrentText(0);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [currentText]);

    return (
        <span className="font-semibold text-3xl">
            <TextShuffler text={shuffledDatasets[currentText].toLocaleLowerCase()} />
        </span>
    )
}