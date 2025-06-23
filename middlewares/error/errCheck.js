const err = (err, req, res, next) => {
    const status =  err.status || 500;
    const message = err.message || "Internal Server error";
    console.error(`Error: ${err.message}`);
    res.status(status).json({
        message: message,
        success: false,

    })

}

export default err;