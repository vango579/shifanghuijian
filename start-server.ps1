$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://+:7890/")
$listener.Start()
Write-Host "Server started on http://localhost:7890/"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.AbsolutePath
        if ($urlPath -eq "/") { $urlPath = "/index.html" }

        $filePath = Join-Path "C:\Users\bu177\Desktop\sfhj" $urlPath.Replace("/", "\")

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath)
            $contentTypes = @{
                ".html" = "text/html"
                ".js" = "text/javascript"
                ".css" = "text/css"
                ".json" = "application/json"
                ".png" = "image/png"
                ".jpg" = "image/jpeg"
            }
            $contentType = $contentTypes[$ext]
            if (-not $contentType) { $contentType = "application/octet-stream" }

            $response.ContentType = $contentType
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }

        $response.Close()
    } catch {
        # 忽略连接错误
    }
}