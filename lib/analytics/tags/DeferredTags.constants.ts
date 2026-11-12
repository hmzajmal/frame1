import { imagineTags } from "../analytics.constants";

export const DEFERRED_TAGS = imagineTags;

export const DEFERRED_TAGS_SCRIPT = (gtmId: string, ga4Id: string, clarityId: string, metaPixelId: string) => `
window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
gtag('js',new Date());gtag('config','${ga4Id}');
window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments);};
!function(f){if(f.fbq)return;var n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];}(window);
fbq('init','${metaPixelId}');fbq('track','PageView');
(function(){
  var started=false;
  function start(){
    if(started||window.__imagineGtmStarted)return;started=true;window.__imagineGtmStarted=true;
    var d=document,h=d.getElementsByTagName('script')[0];
    function add(src){var s=d.createElement('script');s.async=true;s.src=src;h.parentNode.insertBefore(s,h);}
    add('https://www.googletagmanager.com/gtag/js?id=${ga4Id}');
    add('https://www.googletagmanager.com/gtm.js?id=${gtmId}');
    add('https://www.clarity.ms/tag/${clarityId}');
    add('https://connect.facebook.net/en_US/fbevents.js');
  }
  var opts={once:true,passive:true},evts=['pointerdown','keydown','touchstart','scroll','wheel'];
  for(var i=0;i<evts.length;i++)addEventListener(evts[i],start,opts);
  addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')start();});
  addEventListener('pagehide',start);
})();
`;
