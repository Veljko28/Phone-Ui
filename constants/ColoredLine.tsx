const ColoredLine = ({ color, height } : any) => (
    <div
        style={{
            width: '100%',
            backgroundColor: color,
            height: height ? height : '1px'
        }}
    ></div>
);

export default ColoredLine;