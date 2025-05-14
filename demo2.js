const puppeteer = require('puppeteer');
const path = require('path');

async function pdfToImage(pdfPath, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 加载 PDF
  await page.goto(`file://${path.resolve(pdfPath)}`, { waitUntil: 'networkidle0' });

  // 截图为 PNG 图片
  await page.screenshot({ path: outputPath, fullPage: true });

  await browser.close();
}

// 使用示例
pdfToImage('/Users/pbfan/Desktop/dzfp_23442000000350705912_20231227132037.pdf', '/Users/pbfan/Desktop/output2.png')
  .then(() => console.log('PDF 转换成功！'))
  .catch(err => console.error('转换失败：', err));
