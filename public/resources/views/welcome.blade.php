<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Langbe</title>
    <link rel="stylesheet" href="/css/app.css?v=1">
</head>
<body>
    <div id='app'></div>
    @guest
    @else
    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
        @csrf
    </form>
    @endguest

    <script src="./js/Index.js?v=1"></script>
</body>
</html>
