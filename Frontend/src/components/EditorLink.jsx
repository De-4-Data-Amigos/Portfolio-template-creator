function EditorLink({text, href, datapos}) {
    return (
        <div datapos={datapos}>
            <span
                data-href={href}
                className="navbar-item">
                {text}
            </span>
        </div>
    );
}

export default EditorLink;