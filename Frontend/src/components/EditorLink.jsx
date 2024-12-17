function EditorLink({text, href, datapos}) {
    return (
        <span datapos={datapos}
            data-href={href}
            className="navbar-item">
            {text}
        </span>
    );
}

export default EditorLink;