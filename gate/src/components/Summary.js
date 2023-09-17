export default function Summary({formattedTime, environment}) {

    const summaryContainerStyle = {
        display:"flex",
        justifyContent:"center",
        fontSize:"1.5rem"
    }
    return (
        <>
        <div style={summaryContainerStyle}>Timer: {formattedTime}</div>
        <div style={summaryContainerStyle}>Mood: {environment}</div>
        </>
    );
}