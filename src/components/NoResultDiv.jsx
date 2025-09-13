const NoResultDiv=()=>{
    return(
        <div className="no-results"> 
        <img src="public/icons/no-result.svg" alt="No result found" className="icon" />
        <h3 className="title">something went worng</h3>
        <p className="message">we &apos;re unable to retrive the weather details.Ensure you &apos;ve entered a valid city or try again </p>
        </div>
    )
}
export default NoResultDiv;