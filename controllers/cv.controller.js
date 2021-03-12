const puppeteer = require('puppeteer')
const fs = require('fs')
const moment = require('moment')
const cvTemplate = require('../utils/cv.template')
const path = require('path')


module.exports.createCV = async function (req, res) {
  try {
    const bitmap = fs.readFileSync(req.file.path);
    const base64Img = new Buffer.from(bitmap).toString('base64');

    const image = 'data:image/png;base64,' + base64Img
    const html = `
      <!doctype html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport"
                content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
          <title>Document</title>
          <style>
            *{
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: 'Noto Sans', sans-serif;;
            }
        
            main {
              width: 794px;
              height: 1123px;
              background-color: #f4f4f4;
            }
        
            .head {
              padding: 20px 0 15px 0;
              width: 100%;
              /*height: 106px;*/
              background-color: #83A8DE;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              border-bottom: 1px solid #cccccc;
            }
            .image{
              width: 100px;
              height: 100px;
              margin-bottom: 10px;
              border-radius: 20px;
            }
            
            .name {
              font-size: 16px;
              color: #ffffff;
              margin-bottom: 5px;
            }
            
            .position {
              font-size: 12px;
              color: #ffffff;
            }
            
            .bottom-head {
              width: 100%;
              padding: 10px 0;
              background-color: #83A8DE;
              justify-content:center;
              display: flex;
              align-items: center;
              border-radius: 0px 0px 20px 20px;
              margin-bottom: 30px;
            }
            
            .location, .email, .phone {
              display: flex;
              align-items: center;
              margin-right: 20px;
            }
            .phone {
              margin: 0;
            }
            
            .location-title, .email-title, .phone-title {
              color: #ffffff;
              margin-left: 5px;
              font-size: 12px;
            }
          
            .description {
              width: 100%;
              padding: 0 40px;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            
            .profile {
              margin-bottom: 20px;
              width: 100%;
              display: flex;
              flex-direction: column;
              background-color: #ffffff;
              padding: 10px 25px;
              border-radius: 20px;
            }
            
            .profile-title {
              font-size: 20px;
              color: #0a1e51;
              margin-bottom: 5px;
            }
            
            .profile-text {
            font-size: 12px;
            color: #0a1e51;
            }
            
            .container {
              width: 100%;
              display: flex;
              justify-content:space-between;
            }
            
            .left {
              width: 448px;
              height: 400px;
              margin-right: 20px;
            }
            
            .employment-history {
              width: 100%;
              padding: 10px 15px;
              background-color: #ffffff;
              border-radius: 20px;
              display: flex;
              flex-direction: column;
              margin-bottom: 20px;
            }
            
            .employment-history-title {
              font-size: 20px;
              color: #0a1e51;
              margin-bottom: 10px;
            }
            
            .job {
              width: 100%;
              display: flex;
              flex-direction: column;
              padding-bottom: 10px;
              margin-bottom: 15px;
              border-bottom: 1px solid #BBBBBB;
            }
            
            .job-title {
              font-size: 16px;
              color: #757575;
              margin-bottom: 2px;
            }
            
            .job-location {
              font-size: 14px;
              color: #757575;
              margin-bottom: 5px;
            }
            
            .job-period {
              font-size: 10px;
              color: #757575;
              margin-bottom: 5px;
            }
            
            .job-description {
              font-size: 12px;
              color: #757575;
            }
            
            .education {
              margin-bottom: 20px;
              width: 100%;
              padding: 10px 15px;
              background-color: #ffffff;
              border-radius: 20px;
              display: flex;
              flex-direction: column;
            }
            
            .education-title {
              font-size: 20px;
              color: #0a1e51;
              margin-bottom: 10px;
            }
            
            .school {
              width: 100%;
              display: flex;
              flex-direction: column;
              padding-bottom: 10px;
              margin-bottom: 15px;
              border-bottom: 1px solid #BBBBBB;
            }
            
            .school-place {
              font-size: 16px;
              color: #757575;
              margin-bottom: 5px;
            }
            
            .school-location {
              font-size: 14px;
              color: #757575;
              margin-bottom: 5px;
            }
            
            .school-period {
              font-size: 10px;
              color: #757575;
              margin-bottom: 5px;
            }
                    
            .right {
              width: 246px;
            }
            
            .skills {
              width: 100%;
              padding: 10px 15px;
              background-color: #ffffff;
              border-radius: 20px;
              display: flex;
              flex-direction: column;
              margin-bottom: 20px;
            }
            
            .skills-title {
              font-size: 20px;
              color: #0a1e51;
              margin-bottom: 10px;
            }
            
            .skills-list {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
            }
            
            .skill {
              list-style: none;
              margin-bottom: 5px;
            }
            
            .skill-name{
              font-size: 12px;
              color: #757575;
            }
            
            .social-links {
              margin-bottom: 20px;
              width: 100%;
              padding: 10px 15px;
              background-color: #ffffff;
              border-radius: 20px;
              display: flex;
              flex-direction: column;
            }
            
            .social-links-title {
              font-size: 20px;
              color: #0a1e51;
              margin-bottom: 10px;
            }
            
            .social-links-list {
              display: flex;
              flex-direction: column;
            }
            
            .social-link {
              list-style: none;
              margin-bottom: 5px;
              display: flex;
              align-items: center;
              justify-content:space-between;
            }
            
            .social-link-name {
              font-size: 12px;
              color: #757575;
            }
           
           .social-link-link {
            font-size: 12px;
            color: #0A1E51;
            text-decoration: none;
           }
           
           .personal-details {
              margin-bottom: 20px;
              width: 100%;
              padding: 10px 15px;
              background-color: #ffffff;
              border-radius: 20px;
              display: flex;
              flex-direction: column;
            }
            
            .personal-details-title {
              font-size: 20px;
              color: #0a1e51;
              margin-bottom: 10px;
            } 
            
            .personal-detail-list {
              display: flex;
              flex-direction: column;
            }
            
            .personal-detail {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content:space-between;
              margin-bottom: 5px;
            }
            
            .personal-detail-title {
              font-size: 12px;
              color: #757575;
            } 
            
            .personal-detail-description {
              font-size: 12px;
              color: #0a1e51;
            }
            
            .languages{
              margin-bottom: 20px;
              width: 100%;
              padding: 10px 15px;
              background-color: #ffffff;
              border-radius: 20px;
              display: flex;
              flex-direction: column;
            }
            
            .languages-title {
              font-size: 20px;
              color: #0a1e51;
              margin-bottom: 10px;
            } 
            
           .languages-list {
              display: flex;
              flex-direction: column;
            }
            
            .language {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content:space-between;
              margin-bottom: 5px;
            }
            
            .language-title {
              font-size: 12px;
              color: #757575;
            }
            
            .language-level {
              font-size: 12px;
            }
            
          </style>
        </head>
          <body>
            <main>
              <div class="head">
                <img class="image" src="${image}">
                <p class="name">${req.body.firstName} ${req.body.lastName}</p>
                ${req.body.position ? `<p class="position">${req.body.position}</p>` : ''}
              </div>
              <div class="bottom-head">
                <div class="location">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5zm0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3z" fill="#ffffff"/><path d="M16 30l-8.436-9.949a35.076 35.076 0 0 1-.348-.451A10.889 10.889 0 0 1 5 13a11 11 0 0 1 22 0a10.884 10.884 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447zM8.812 18.395c.002 0 .234.308.287.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.901 8.901 0 0 0 25 13a9 9 0 1 0-18 0a8.905 8.905 0 0 0 1.813 5.395z" fill="#ffffff"/></svg>
                  <p class="location-title">${req.body.city }, ${req.body.country}</p>
                </div>
    
                <div class="email">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M28 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-2.2 2L16 14.78L6.2 8zM4 24V8.91l11.43 7.91a1 1 0 0 0 1.14 0L28 8.91V24z" fill="#ffffff"/></svg>
                  <p class="email-title">${req.body.email}</p>
                </div>
    
                ${req.body.phone ? `
                  <div class="phone">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M10.554 6.24L7.171 2.335c-.39-.45-1.105-.448-1.558.006L2.831 5.128c-.828.829-1.065 2.06-.586 3.047a29.207 29.207 0 0 0 13.561 13.58c.986.479 2.216.242 3.044-.587l2.808-2.813c.455-.455.456-1.174.002-1.564l-3.92-3.365c-.41-.352-1.047-.306-1.458.106l-1.364 1.366a.462.462 0 0 1-.553.088a14.557 14.557 0 0 1-5.36-5.367a.463.463 0 0 1 .088-.554l1.36-1.361c.412-.414.457-1.054.101-1.465z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                    <p class="phone-title">${req.body.phone}</p>
                  </div>
                ` : ''}
                
              </div>
    
              <div class="description">
                ${cvTemplate.getSkills(req.body.skills)}
                
                ${cvTemplate.getAboutYourself(req.body.aboutYourself)}
    
                <div class="container">
                  <div class="left">
                    ${cvTemplate.getEmploymentHistory(req.body.employmentHistory)}
                    ${cvTemplate.getEducationHistory(req.body.educationHistory)}
                  </div>
    
                  <div class="right">
                    ${cvTemplate.getSocialLinks(req.body.links)}
                    
                    <div class="personal-details">
                      <p class="personal-details-title">Personal details</p>
                      <ul class="personal-details-list">
                        <li class="personal-detail">
                          <p class="personal-detail-title">Date of birth</p>
                          <p class="personal-detail-description">${req.body.day}.${req.body.month}.${req.body.year}</p>
                        </li>
                        ${req.body.nationality ? `
                          <li class="personal-detail">
                          <p class="personal-detail-title">Nationality</p>
                          <p class="personal-detail-description">${req.body.nationality}</p>
                          </li>
                        ` : ''}
                      </ul>
                    </div>
    
                    ${cvTemplate.getLanguages(req.body.languages)}
                  </div>
              </div>
              </div>
            </main>
          </body>
        </html>
  `
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.setContent(html)
    const pdf = await page.pdf({
      path: `uploads/cv/${req.user.firstName}_${req.user.lastName}_${moment().format('DDMMYYYYHHmmssSSS')}CV.pdf`,
      format: 'A4',
      printBackground: true,
      margin: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
      }
    })

    await browser.close()
    console.log(pdf)
    res.contentType("application/pdf");
    res.send(pdf);
  } catch (e) {
    console.log(e)
  }
}
