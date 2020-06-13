import express, { response, request } from 'express'

const app = express()

app.get('/scraping/:username/:repositoryname', (request, response) => {
    const { username, repositoryname } = request.params

    return response.status(200).json({message : 'OK'})
})

app.listen('3000', function() {
    console.log(`Example app listening`);
})


