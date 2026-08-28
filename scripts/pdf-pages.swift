import Foundation
import PDFKit
import ImageIO
import CoreGraphics

let a = CommandLine.arguments
guard a.count >= 5, let doc = PDFDocument(url: URL(fileURLWithPath: a[1])) else {
    FileHandle.standardError.write("usage: render.swift <pdf> <outdir> <from> <to> [scale]\n".data(using: .utf8)!)
    exit(1)
}
let outDir = a[2]
let from = max(1, Int(a[3]) ?? 1)
let to = min(doc.pageCount, Int(a[4]) ?? doc.pageCount)
let scale = CGFloat(a.count > 5 ? (Double(a[5]) ?? 1.5) : 1.5)
try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)

for i in (from - 1)...(to - 1) {
    guard let page = doc.page(at: i) else { continue }
    let r = page.bounds(for: .mediaBox)
    let w = Int(r.width * scale), h = Int(r.height * scale)
    guard let ctx = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8,
                              bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(),
                              bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue) else { continue }
    ctx.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
    ctx.fill(CGRect(x: 0, y: 0, width: w, height: h))
    ctx.scaleBy(x: scale, y: scale)
    ctx.translateBy(x: -r.origin.x, y: -r.origin.y)
    page.draw(with: .mediaBox, to: ctx)
    guard let img = ctx.makeImage() else { continue }
    let url = URL(fileURLWithPath: "\(outDir)/p\(String(format: "%03d", i + 1)).png") as CFURL
    guard let dest = CGImageDestinationCreateWithURL(url, "public.png" as CFString, 1, nil) else { continue }
    CGImageDestinationAddImage(dest, img, nil)
    CGImageDestinationFinalize(dest)
}
print("rendered pages \(from)–\(to) at \(scale)x")
