$("document").ready(function()
{
$(".dot1,.dot2,.dot3").hide();

$(".showdot1").click(function()
{
$(".dot2,.dot3").hide();
$(".dot1").toggle();
});
$(".showdot2").click(function()
{
$(".dot1,.dot3").hide();
$(".dot2").toggle();
});
$(".showdot3").click(function()
{
$(".dot1,.dot2,.dot4").hide();
$(".dot3").toggle();
});
$(".showdot4").click(function()
{
$(".dot1,.dot2,.dot3").hide();
$(".dot4").toggle();
});


 // <!-- <!-- // executes when HTML-Document is loaded and DOM is ready --> -->

  // when you hover a toggle show its dropdown menu
  // $(".navbar .dropdown-toggle").hover(function () {
     // $(this).parent().toggleClass("show");
     // $(this).parent().find(".dropdown-menu").toggleClass("show");
   // });

    // // hide the menu when the mouse leaves the dropdown
  // $( ".navbar .dropdown-menu" ).mouseleave(function() { 
    // setTimeout(function() {
      // $(this).removeClass("show"); 
    // },5000); // delay the removal of the 'show' class for 3 seconds -->
  // });
// });

// </script>
});

