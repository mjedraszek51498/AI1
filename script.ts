
const msg: string = "Ts file compiled!";
alert(msg);
interface StyleDictionary {
    [key: string]: string;
}

const styles: StyleDictionary = {
    style1: "style.css",
    style2: "style2.css",
    style3: "style3.css",

};


const updateStyle = (styleName: string) => {
    const style = styles[styleName];
    let linkElement = document.getElementById("stylesheet") as HTMLLinkElement;
    linkElement.href = style;
};


const generateStyleLinks = () => {
    const container = document.getElementById("style-links");
    Object.keys(styles).forEach((styleName) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = `Switch to ${styleName}`;
        link.style.marginRight = "10px";
        link.style.backgroundColor = "white";


        link.addEventListener("click", (event) => {
            updateStyle(styleName);
        });
        container?.appendChild(link);
    });
};


generateStyleLinks();