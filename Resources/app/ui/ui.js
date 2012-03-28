(function(){
  // 名前空間をさらに機能ごとに分割する
  // 今回はUIを作成するための機能を集約しているので ui と命名した
  app.ui = {};

  var style = {
    barColor: '#000',
    backgroundColor: '#000'
  };

  // ファクトリメソッド
  // アプリケーションを起動させるために必要なタブグループやウインドウを生成する
  app.ui.createApplicationTabGroup = function(){
    Titanium.UI.setBackgroundColor('#000');

    var tabGroup = Ti.UI.createTabGroup();

    var tab1 = app.ui.createStopWatchTab();
    var tab2 = app.ui.createHowToPlayTab();

    tabGroup.addTab(tab1);
    tabGroup.addTab(tab2);

    return tabGroup;
  };

  // ファクトリメソッド
  // 「ストップウォッチ」タブを生成する
  app.ui.createStopWatchTab = function(){
    var win = Titanium.UI.createWindow({
      title: 'ストップウォッチ',
      barColor: style.barColor,
      backgroundColor: style.backgroundColor
    });
    var tab = Titanium.UI.createTab({
      icon: 'dark_clock.png',
      title: 'ストップウォッチ',
      window: win
    });

    var label = Ti.UI.createLabel({
      text: '00:00:00.000',
      color: 'white',
      width: 'auto', height: 'auto',
      font: {fontSize: 40, fontWeight: 'bold'}
    });
    win.add(label);

    var button = Ti.UI.createButton({
      title: 'Start',
      width: 150, height: 40,
      bottom: 30
    });
    win.add(button);

    var intervalId = null;

    var _startStopwatch = function() {
      label.value = '00:00:00.000';

      var startTime = new Date();

      var _updateTimer = function updateTimer() {
        var UNIT_HOUR = 60 * 60 * 1000;
        var UNIT_MINUTE = 60 * 1000;
        var UNIT_SEC = 1000;

        var now = new Date();
        var diff = now.getTime() - startTime.getTime();

        var hour = Math.floor(diff / UNIT_HOUR);
        var minute = Math.floor((diff - hour * UNIT_HOUR) / UNIT_MINUTE);
        var sec = Math.floor((diff - hour * UNIT_HOUR - minute * UNIT_MINUTE) / UNIT_SEC);
        var msec = Math.floor(diff % UNIT_SEC);
        label.text = ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2) + ':' + ('0' + sec).slice(-2) + '.' + ('00' + msec).slice(-3);
      };

      intervalId = setInterval(_updateTimer, 3);
      button.title = 'stop';
    };

    var _stopStopwatch = function() {
      clearInterval(intervalId);
      button.title = 'Start';
    };

    var started = false;
    button.addEventListener('click', function() {
      if (started) {
        _stopStopwatch();
        started = false;
      } else {
        _startStopwatch();
        started = true;
      }
    });

    return tab;
  };

  // ファクトリメソッド
  // 「使い方」タブを生成する
  app.ui.createHowToPlayTab = function(){
    var win = Titanium.UI.createWindow({
      title: '使い方',
      barColor: style.barColor,
      backgroundColor: style.backgroundColor
    });

    var tab = Titanium.UI.createTab({
      icon: 'dark_info.png',
      title: '使い方',
      window: win
    });

    var web = Ti.UI.createWebView({
      url: 'how_to_play.html'
    });
    win.add(web);

    return tab;
  }
})();
