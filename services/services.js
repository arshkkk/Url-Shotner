exports.isAlreadyVisited = (urlId, req,res) => {
    const visitedUrls = JSON.parse(req.cookies.visitedUrls)

    return visitedUrls.find(url => url ===urlId.toString())
}

exports.markAsVisited = (urlId, req,res) => {
    const visitedUrls = JSON.parse(req.cookies.visitedUrls)
    visitedUrls.push(urlId.toString())
    res.cookie('visitedUrls', JSON.stringify(visitedUrls),{expires: new Date(253402300000000), overwrite:true})
}


