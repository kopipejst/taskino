<!doctype html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Taskino App</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <link rel="stylesheet" href="css/style.css">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="js/jquery.flexslider-min.js"></script>
    </head>
    <body>
        <div class="wrapper clearfix">
            <div class="container clearfix">
                <div class="content-left">
                    <header>
                        <h1 class="logo">
                            <a href="">Taskino</a>
                        </h1>
                    </header>
                    <h2>Another ToDo app for your Multiple Tasks</h2>
                    <p>You can easy add task to your list, add, edit or remove multiple list as you want, “tap” it to finish task, restore “recently done” tasks.</p>
                    <a href="https://marketplace.firefox.com/app/taskino" class="firefox-marketplace" title="Available on FireFox Marketplace">Available on FireFox Marketplace</a>
                    <a href="https://github.com/kopipejst/taskino" class="github" title="View at GitHub">View at GitHub</a>
                </div>
                <div class="content-right">
                    <div class="smartphone">
                        <div class="flexslider">
                            <ul class="slides">
                                <li>
                                  <img src="img/taskino-list.png" alt="Taskino Lists"/>
                                </li>
                                <li>
                                  <img src="img/taskino-tasks.png" alt="Taskino Tasks"/>
                                </li>
                                <li>
                                  <img src="img/taskino-edit.png" alt="Taskino Edit"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div class="footer-content">
                <p class="twitter-share">Like the Taskino app? <a href="http://twitter.com/intent/tweet?url=http://taskino.workshop.rs/&text=I%20like%20Taskino%20Firefox%20OS%20App%20">Share it</a>.</p>

                <p>For support or any suggestions <a href="mailto:devet.sest@gmail.com?subject=Taskino%20App%20-%20Site%20Contact">contact us</a> via our e-mail. <br>© 2013 Taskino</p>
            </div>
        </footer>
        <script type="text/javascript">
            $(window).load(function(){
                $('.content-left').addClass('transition-left');
                $('.content-right').addClass('transition-top');
                $('.flexslider').flexslider({
                    animation: "slide",
                    directionNav: true,
                    slideShow: true,
                    slideshowSpeed: 5000,
                    itemWidth: 320,
                    controlNav: false
                });
            });

          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-41532798-1', 'workshop.rs');
          ga('send', 'pageview');
        </script>
    </body>
</html>