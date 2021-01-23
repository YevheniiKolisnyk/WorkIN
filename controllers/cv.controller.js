const puppeteer = require('puppeteer')

module.exports.createCV = async function (req, res) {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({
      width: 2480,
      height: 3508
    })

    await page.setContent(`
    <body style="margin: 0;padding: 0;">
      <main style="width: 794px;height: 1123px; display: flex; flex-direction: column; background: red">
        <div class="head" style="width: 100%; height: 18%;display: flex; align-items: center;justify-content: center; background-color: #83A8DE;">
          <div class="user-info" style="height: 75%;display: flex;flex-direction: column; justify-content: center;align-items: center;">
            <img src="../client/src/assets/userpic.png" alt="">
            <p class="name" style="color: #ffffff;">Alice Kaplan</p>
            <p class="position" style="color: #ffffff;">UI/UX designer</p>
          </div>
        </div>
      </main>
    </body>
    `)
    await page.emulateMediaType('screen')
    await page.pdf({
      path: 'my.pdf',
      format: 'A4',
      printBackground: true
    })
    await browser.close()

  } catch (e) {
    console.log(e)
  }
}
