const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

// PDF 路径
const filePath = '/Users/pbfan/Desktop/dzfp_23442000000350705912_20231227132037.pdf';
const buffer = fs.readFileSync(filePath);

pdf(buffer).then(function(data) {
  const text = data.text.trim();

  console.log('================ PDF 检测结果 ================');
  console.log(`📄 文件名: ${path.basename(filePath)}`);
  console.log(`📄 总页数: ${data.numpages}`);
  console.log(`📄 字节大小: ${buffer.length} bytes`);
  console.log('----------------------------------------------');

  if (text.length === 0) {
    console.log('👉 检测结果：这是图片型 PDF（可能是扫描件）');
  } else {
    console.log('✅ 检测结果：这是文本型 PDF，可以直接提取文字');
    console.log('\n📝 提取的文本内容（前 500 字）：\n');
    console.log(text.slice(0, 500)); // 显示前 500 字

    // 保存为 txt 文件
    const outputPath = filePath.replace(/\.pdf$/, '.txt');
    fs.writeFileSync(outputPath, text, 'utf-8');
    console.log(`\n📁 已保存全部文本到：${outputPath}`);
  }

  console.log('==============================================');

}).catch((err) => {
  console.error('❌ 读取 PDF 时出错：', err);
});
