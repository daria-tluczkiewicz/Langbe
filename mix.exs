const mix = require('laravel-mix');

mix.react('resources', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps();

if (mix.inProduction()) {
    mix.version();
}