
# Showcase
https://github.com/Skrazzo/memory-game/assets/58330666/425e23dd-a1ea-4966-8423-60bc3e015b2c

## Description
Made with:
* Laravel
* Breeze
* Tailwind
* React


And combined everything with **Inertia**, this basic memory game has **nice animations, dashboard, profile managment, leaderboard, theme selector and of course, the game** itself.
It's a nice way of spending half an hour to practice your memory.



# Install

Clone the repository and open terminal in the cloned directory.

Here's commands for setting up Laravel back-end:
```sh
composer install
cp .env.example .env
php artisan key:generate
```

After configurating .env file run
```sh
php artisan migrate
```

Now we need to install everything for React front-end:
```sh
npm i
```

That's all, for front-end you will need to run Vite, with `npm run dev` and back-end with `php artisan serve` and you will be able to access React on **localhost:8000** ( default Laravel port )

**Happy Hacking !**


