interface BotanProps {
    children: string;
    href?: string;
    onClick?: () => void;
}

export default function Botan(props: BotanProps) {
    if (props.href) {
        return (
            <a href={props.href} className="simple-button" target="_blank" rel="noopener noreferer">{props.children}</a>
        )
    }
    return (
        <button onClick={props.onClick} className="simple-button">{props.children}</button>
    )
}
