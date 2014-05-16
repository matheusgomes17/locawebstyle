var locastyle = locastyle || {};

locastyle.tabs = (function() {
  'use strict';

  var config = {
    selectors: {
      // Nomenclatura o mais simples possivel. Nao preciso de collapseHead, já sei que estou no módulo collapse
      head     : '.ls-modulo-header',
      body     : '.ls-modulo-body',
      footer   : '.ls-modulo-footer',
      // podemos já selecionar, caso seja algo geral, nao dentro de um escopo
      $buttons : $('.ls-modulo-buttons')
    },
    triggers : {
      // selector   : [event, handler, [data] ]
      '[data-ls-module=tabs]'  : [ 'click', 'tabHandler' ]
    }
  }

  function init() {
    loadConfig();
    loadEvents();
    bindBreakpointUpdateOnChecker();
    checkBreakpoint();
  }

  // Carrega as configurações do usuário, se existirem
  function loadConfig() {
    $.each(config, function(index, val) {
      config[index] = config[index] || config[index];
    });
  }

  // vincula os trigggers, atomaticamente adicionando o .ls para escopo do evento
  function loadEvents() {
    $.each(config.triggers, function(selector, handler) {
      $(selector)
        .off( handler[0] + '.ls' )
        .on( handler[0] + '.ls', function (evt){
            locastyle.tabs[handler[1]](evt, this, handler[2]);
        });
    });
  }

  // checa se a tab está em modo dropdown
  function isDropdownMode(el) {
    return $(el).hasClass('in-dropdown');
  }

  // ativa a aba de acordo com os argumentos recebidos
  function activateTab(el, $target) {
    $(el).parents("li").addClass("active");
    $target.addClass("active");
  }

  // desativa a aba de acordo com os argumentos recebidos
  function deactivateTab(el, $target) {
    $(el).parents("li").siblings().removeClass("active");
    $target.siblings().removeClass("active");
  }

  // adiciona o bind de breakpoint-updated e chama o checker quando o evento ocorre
  function bindBreakpointUpdateOnChecker() {
    $(document).on("breakpoint-updated", function () {
      locastyle.tabs.checkBreakpoint();
    })
  }

  // verifica o breakpoint e se a tab já está em modo droppdown
  function checkBreakpoint() {
    if(locastyle.breakpointClass == "ls-screen-sm" || locastyle.breakpointClass == "ls-screen-xs"){
      $(".ls-tabs-nav").each(function (index, value) {
        if(!isDropdownMode(value)){
          dropdownShape(value);
        };
      });
    }
  }

  // adiciona o bind de click no modulo e chama os métodos necessários
  function tabHandler(evt, el) {
    console.log("chumba")
    evt.preventDefault();
    var $target = $($(el).attr("href") || $(el).data("target"));
    deactivateTab(el, $target);
    activateTab(el, $target);
    if(isDropdownMode($(el).parents(".ls-tabs-nav"))){
      updateTriggerLink($(el).parents(".ls-tabs-nav"));
    }
  }

  // atualiza o link do dropdowna com valor da aba ativa
  function updateTriggerLink(tabNav) {
    //limpa trigger o atual
    $(tabNav).parents(".ls-dropdown").find("> a").remove();

    //atualiza com o novo trigger
    $(tabNav).parents(".ls-dropdown").prepend($(tabNav).find("li.active").html());

    // adiciona classe de estilo no trigger
    $(tabNav).parents(".ls-dropdown").find("> a").addClass("ls-btn");

    // reinicializa o módulo de dropdown para pegar o novo trigger
    locastyle.dropdown.init();
  }

  // altera a tab para o modo dropdown
  function dropdownShape(tabNav) {
    // coloca a div de dropdown em volta da navegação de abas
    $(tabNav).wrap('<div data-ls-module="dropdown" class="ls-dropdown">');

    // coloca a aba ativa como link do dropdown
    updateTriggerLink(tabNav);

    // adiciona a classe que altera o estilo dos links
    $(tabNav).addClass("in-dropdown");

    // adiciona a classe usada pelo dropdown para fazer o toggle
    $(tabNav).addClass("ls-dropdown-nav");
  }

  return {
    init: init,
    tabHandler: tabHandler,
    checkBreakpoint: checkBreakpoint
  };

}());


/*
var locastyle = locastyle || {};

locastyle.tabs = (function() {
  'use strict';

  function init() {
    unbind();
    bindClickOnTriggers();
    bindBreakpointUpdateOnChecker();
    checkBreakpoint();
  }

  // adiciona o bind de click no modulo e chama os métodos necessários
  function bindClickOnTriggers() {
    $("[data-ls-module=tabs]").on("click.ls", function(evt) {
      evt.preventDefault();
      var $target = $($(this).attr("href") || $(this).data("target"));
      deactivateTab(this, $target);
      activateTab(this, $target);
      if(isDropdownMode($(this).parents(".ls-tabs-nav"))){
        updateTriggerLink($(this).parents(".ls-tabs-nav"));
      }
    });
  }

  // adiciona o bind de breakpoint-updated e chama o checker quando o evento ocorre
  function bindBreakpointUpdateOnChecker() {
    $(document).on("breakpoint-updated", function () {
      locastyle.tabs.checkBreakpoint();
    })
  }

  // checa se a tab está em modo dropdown
  function isDropdownMode(el) {
    return $(el).hasClass('in-dropdown');
  }

  // verifica o breakpoint e se a tab já está em modo droppdown
  function checkBreakpoint() {
    if(locastyle.breakpointClass == "ls-screen-sm" || locastyle.breakpointClass == "ls-screen-xs"){
      $(".ls-tabs-nav").each(function (index, value) {
        if(!isDropdownMode(value)){
          dropdownShape(value);
        };
      });
    }
  }

  // atualiza o link do dropdowna com valor da aba ativa
  function updateTriggerLink(tabNav) {
    //limpa trigger o atual
    $(tabNav).parents(".ls-dropdown").find("> a").remove();

    //atualiza com o novo trigger
    $(tabNav).parents(".ls-dropdown").prepend($(tabNav).find("li.active").html());

    // adiciona classe de estilo no trigger
    $(tabNav).parents(".ls-dropdown").find("> a").addClass("ls-btn");

    // reinicializa o módulo de dropdown para pegar o novo trigger
    locastyle.dropdown.init();
  }

  // altera a tab para o modo dropdown
  function dropdownShape(tabNav) {
    // coloca a div de dropdown em volta da navegação de abas
    $(tabNav).wrap('<div data-ls-module="dropdown" class="ls-dropdown">');

    // coloca a aba ativa como link do dropdown
    updateTriggerLink(tabNav);

    // adiciona a classe que altera o estilo dos links
    $(tabNav).addClass("in-dropdown");

    // adiciona a classe usada pelo dropdown para fazer o toggle
    $(tabNav).addClass("ls-dropdown-nav");
  }

  // ativa a aba de acordo com os argumentos recebidos
  function activateTab(el, $target) {
    $(el).parents("li").addClass("active");
    $target.addClass("active");
  }

  // desativa a aba de acordo com os argumentos recebidos
  function deactivateTab(el, $target) {
    $(el).parents("li").siblings().removeClass("active");
    $target.siblings().removeClass("active");
  }

  // remove os binds que o próprio modulo adiciona
  function unbind() {
    $("[data-ls-module=tabs]").off("click.ls");
  }

  return {
    init: init,
    unbind: unbind,
    checkBreakpoint: checkBreakpoint
  }

}());
*/
