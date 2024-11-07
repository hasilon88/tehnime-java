import loadingImage from '../assets/loading-gif-gojo.gif'
export const Loading = () => {
    return (
        <div style={{backgroundColor: "#E5E5E5"}}>
            <div className="flex h-screen items-center justify-center">
                <img src={loadingImage} alt="Loading"/>
            </div>
        </div>
    )
}