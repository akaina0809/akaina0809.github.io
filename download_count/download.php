<?php header("Content-Type:text/html;charset=utf-8"); ?>
<?php //error_reporting(E_ALL | E_STRICT);//デバッグ
###############################################################################################
##
#  PHPダウンロードカウンター
#　改造や改変は自己責任で行ってください。
#	
#  今のところ特に問題点はありませんが、不具合等がありましたら下記までご連絡ください。
#  MailAddress: info@php-factory.net
#  name: K.Numata
#  HP: http://www.php-factory.net/
##
###############################################################################################

if(isset($_GET)) $_GET = sanitize($_GET);//NULLバイト除去//
if(isset($_POST)) $_POST = sanitize($_POST);//NULLバイト除去//
if(isset($_COOKIE)) $_COOKIE = sanitize($_COOKIE);//NULLバイト除去//


/*=============================================================================================================

ダウンロードファイルの絶対パス（http～）※相対パス不可。URLは必ずhttp～から始まるURLを指定して下さい。
追加する場合は、1行をそのままコピペでその下に追加し、「'1' =>」の数字部分を必ず変更して下さい。
特に理由が無ければ連番（1,2,3...）にしてください。

複数の場合の記述例

$download_url = array(
'1' => 'http://www.php-factory.net/demo/download_count/test1.pdf',
'2' => 'http://www.php-factory.net/demo/download_count/test2.pdf',
'3' => 'http://www.php-factory.net/demo/download_count/test3.pdf',
'4' => 'http://www.php-factory.net/demo/download_count/test4.pdf',
);


左側の数字がそのままダウンロード用のパラメータになります。
パラメータがdownload=1で「'1' =>」のURL、download=3で「'3' =>」のURLのファイルがダウンロードされます。
例　あなたのサイトURL/download_count/download.php?download=1　で「'1' => 」のURLのファイルがダウンロードになります。

ダウンロードリンクごとにログファイルが生成されます。
リストから削除すれば該当するログファイルも削除されます。
※削除のタイミングはいずれかのダウンロードリンクをクリックした際に削除処理されます。


=============================================================================================================*/

//-----------------------------　設定箇所（START）　-------------------------------
//ダウンロードファイルの絶対パス（http～）記述
$download_url = array(
'1' => 'https://akaina0809.github.io/dsito/download_count/download.php?download=1',

);


//カウントを表示するページの文字コード
//Shift-jisは「SJIS」、EUC-JPは「EUC-JP」と指定してください。デフォルトはUTF-8。
$encodingType = 'UTF-8';


//ダウンロード履歴閲覧のための認証用ID、パスワード　※必ず変更して下さい！
//半角英数字のみ
$userid   = 'akaina';   // ユーザーID
$password = '13901127';   // パスワード

//-----------------------------　設定箇所（END）　-------------------------------


//-----------------------------以下変更不可（日本語部、htmlは編集可）---------------------------------

$base_day = date("Y/m/d"); //日付の取得
$yesterday = date("Y/m/d",strtotime("-1day")); //日付の取得

//総ダウンロード数格納データファイルのパス（変更不可）
$data_log_dir = 'data/';
foreach($download_url as $key => $val){
	$file_path[$key] = $data_log_dir."download_count_".$key.".log";
}
//パーミッションチェック
if(!is_writable($data_log_dir)){
  $permission_chk = 'dataディレクトリのパーミッションが正しくありません。パーミッションを777等（サーバによる）ファイル書き込み可能に変更ください';
}
if(!empty($permission_chk)){
	echo $permission_chk;exit();
}
$copyrights = '<a style="display:block;text-align:center;margin:15px 0;font-size:11px;color:#aaa;text-decoration:none" href="http://www.php-factory.net/" target="_blank">- PHP工房 -</a>';

//----------------------------------------------------------------------
//  ダウンロード数表示用処理 (START)
//----------------------------------------------------------------------
if(isset($_GET['dsp_count'])){
	header("Content-type: application/x-javascript");
	
	if(!preg_match("/^[0-9]+$/",$_GET['dsp_count'])){
	echo "document.write(\"パラメータが正しくありません。半角数字を指定して下さい。\")";exit();
	}
	  $dsp_count_no = $_GET['dsp_count'];
	  if(!file_exists($file_path[$dsp_count_no])){
		//ファイルが存在しない場合はデータを追加してファイル生成
		file_new_generate($file_path[$dsp_count_no]);
	  }
	  $line = file($file_path[$dsp_count_no]);
	  $total = 0;
	  $today_count = 0;	
	  $yesterday_count = 0;
	  foreach($line as $val){
		  $val_array = explode(',',$val);
		  $total += trim($val_array[1]);
		  if(strpos($val_array[0],$base_day) !== false){
			  $today_count = trim($val_array[1]);
		  }
		  if(strpos($val_array[0],$yesterday) !== false){
			  $yesterday_count = trim($val_array[1]);
		  }
	  }
	
	
	if(isset($_GET['day_dsp']) =='on'){
 //出力
$count_dsp = <<<EOF
document.write('<p class="download_count">総ダウンロード数：{$total}（<span class="count_today">Today:{$today_count}</span> <span class="count_yesterday">Yesterday:{$yesterday_count}</span>）</p>')
EOF;

	}else{
//出力
$count_dsp = <<<EOF
document.write('<p class="download_count">総ダウンロード数：{$total}</p>')
EOF;
	}
	//UTF-8以外であれば文字コード変更
	if($encodingType!='UTF-8') $count_dsp = mb_convert_encoding($count_dsp,"$encodingType",'UTF-8');
	echo $count_dsp;
	
	exit();
}
//----------------------------------------------------------------------
//  ダウンロード数表示用処理 (END)
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//  ダウンロード数保存処理(START)
//----------------------------------------------------------------------

//パラメータ（id）を取得
if(isset($_GET['download'])){
	$file_id = $_GET['download'];
	//パラメータが配列数以下かor数字であるかのチェック
	if(!preg_match("/^[0-9]+$/",$file_id)){
		exit('パラメータの数値が間違っています。');
	}
	
	//$line = file($file_path[$file_id]);
	
	$fp = fopen($file_path[$file_id],"r+b");
	flock($fp,LOCK_EX);
	
	$line = array();
	while(($data = fgets($fp)) !== false ){
		$line[] = $data;
	}
	
	ftruncate($fp,0);
	rewind($fp);
	
	//日付が変わったら先頭の行に追記
	if(strpos($line[0],$base_day) === false){
		$write_line = $base_day.',1'."\n";
		fwrite($fp,$write_line);
	}
	
	foreach($line as $val){
		//当日の場合はカウントアップ
		if(strpos($val,$base_day) !== false){
			$val_array = explode(',',$val);
			$val_array[1] = rtrim($val_array[1],"\n") + 1;
			$val = $val_array[0].','.$val_array[1]."\n";
		}
		fwrite($fp,$val);
	}
	fflush($fp);
	flock($fp,LOCK_UN);
	fclose($fp);

			//----------------------------------------------------------------------
			//  ダウンロードリストに無いファイルを削除する(START)
			//----------------------------------------------------------------------
			$dh = opendir($data_log_dir);
			while(false !== ($fn = readdir($dh))){
				$exis_check = '';
				foreach($download_url as $key => $val){
					if($fn == "download_count_".$key.".log"){
						   $exis_check = 'Found';
						   break;
					}
				}
				if($exis_check == '' && $fn !== '.' && $fn !== '..' && !is_dir($data_log_dir.$fn)){
					//ファイル削除実行
					if(!empty($data_log_dir) && strpos($fn,'.log') !== false){
						@unlink($data_log_dir.$fn);
					}
				}
			}
			closedir($dh);
			//----------------------------------------------------------------------
			//  ダウンロードリストに無いファイルを削除する(END)
			//----------------------------------------------------------------------

//----------------------------------------------------------------------
//  ダウンロード数保存処理(END)
//----------------------------------------------------------------------

	//ダウンロードファイルへのリダイレクト実行 
	header("Location: {$download_url[$file_id]}");
	exit();
}
else{
	//exit('パラメータが間違っています。リンクはdownload=○と指定してください。○は数値（配列の番号）');	

//----------------------------------------------------------------------
//  ダウンロード履歴表示(START)
//----------------------------------------------------------------------

session_start();
if(isset($_GET['logout'])){
$_SESSION = array();
# セッションを破棄
session_destroy();
}
$login_error = '';
# セッション変数を初期化
if (!isset($_SESSION['auth'])) {
  $_SESSION['auth'] = FALSE;
}
if (isset($_POST['userid']) && isset($_POST['password'])){
    if ($_POST['userid'] === $userid &&
        $_POST['password'] === $password) {
      $oldSid = session_id();
      session_regenerate_id(TRUE);
      if (version_compare(PHP_VERSION, '5.1.0', '<')) {
        $path = session_save_path() != '' ? session_save_path() : '/tmp';
        $oldSessionFile = $path . '/sess_' . $oldSid;
        if (file_exists($oldSessionFile)) {
          unlink($oldSessionFile);
        }
      }
      $_SESSION['auth'] = TRUE;
    }
  if ($_SESSION['auth'] === FALSE) {
    $login_error = '<center><font color="red">ユーザーIDかパスワードに誤りがあります。</font></center>';
  }
}
if ($_SESSION['auth'] !== TRUE) {
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
<head>
<meta name="robots" content="noindex,nofollow" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ダウンロード履歴管理画面</title>
</head>
<style type="text/css">
#login_form{
	width:500px;	
	margin:25px auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0px 7px #aaa;
    font-weight: normal;
    padding: 16px 16px 20px;
	color:#666;
	line-height:1.3;
	font-size:90%;
}
form .input {
    font-size: 20px;
    margin:2px 6px 10px 0;
    padding: 3px;
    width: 97%;
}
input[type="text"], input[type="password"], input[type="file"], input[type="button"], input[type="submit"], input[type="reset"] {
    background-color: #FFFFFF;
    border: 1px solid #999;
}
.button-primary {
    border: 1px solid #000;
    border-radius: 11px;
    cursor: pointer;
    font-size: 18px;
    padding: 3px 10px;
	width:450px;
	height:38px;
}
.Tac{text-align:center}
</style>
<body>
<?php if(isset($login_error)) echo $login_error;?>
 <div id="login_form">

 <p class="Tac">ダウンロード履歴を閲覧するにはログインする必要があります。<br />
   ID、パスワードを入力して下さい。<br />管理者以外の入場は固くお断りします。IPアドレスを記録しております。</p>
<form action="<?php echo $file_name; ?>?mode=download" method="post">
<label for="userid">ユーザーID</label>
<input class="input" type="text" name="userid" id="userid" value="" style="ime-mode:disabled" />
<label for="password">パスワード</label>      
<input class="input" type="password" name="password" id="password" value="" size="30" />
<p class="Tac">
<input class="button-primary" type="submit" name="login_submit" value="　ログイン　" />
</p>
</form>
</div>
</body>
</html>
<?php
	exit();
	}else{

?>
<!DOCTYPE html>
<meta charset="utf-8">
<meta name="robots" content="noindex,nofollow">
<title>ダウンロード履歴</title>
<style type="text/css">
<!--
p{
	font-size:90%;
}
h1{
	font-size:16px;
	color:#39F;
}
h2{
	font-size:13px;
	padding:10px 0 0;
	border-top:1px solid #999;
	color:#963;
}
table{
	border-collapse:collapse;
}
td,th{
	padding:5px 10px;
	border:1px solid #999;
	text-align:right;
	font-size:90%;
}
th{
	background:#F2FFE6;
	text-align:center;
	font-weight:normal;
}
-->
</style>
<h1>ダウンロード履歴</h1>
<p>※日付が歯抜け（無い）の場合はダウンロードが「0」ということになります。　【<a href="?logout=true">ログアウト</a>】</p>
<?php foreach($file_path as $key => $val){ ?>
<h2><?php echo 'ファイル：'.$download_url[$key];?></h2>
<table>
<tr>
<th>日付</th>
<td>ダウンロード数</td>
</tr>
<?php	  
$total_download = 0;
$line = file($val);
foreach($line as $line_val){
$line_array = explode(',',$line_val);
$total_download += $line_array[1];
?>	  
<tr>
<th><?php echo $line_array[0];?></th>
<td><?php echo $line_array[1];?></td>
</tr>
<?php }?>
<tr>
<th colspan="2">総ダウンロード数：<?php echo $total_download;?></th>
</tr>
</table>
<?php }
if(!empty($copyrights)) echo $copyrights;

	}
//----------------------------------------------------------------------
//  ダウンロード履歴表示(END)
//----------------------------------------------------------------------
}
?>

<?php
//----------------------------------------------------------------------
//  関数定義(START)
//----------------------------------------------------------------------

//NULLバイト除去
function sanitize($arr){
	if(is_array($arr)){
		return array_map('sanitize',$arr);
	}
	return str_replace("\0","",$arr);
}
//ファイル生成
function file_new_generate($str){
	$base_day = date("Y/m/d"); //日付の取得
	$fp = fopen($str,"a+b");
	flock ($fp,LOCK_EX);
	ftruncate($fp,0);
	rewind($fp);
	fwrite($fp,"$base_day,0");
	fclose($fp);
    @chmod($str, 0666);
}
//----------------------------------------------------------------------
//  関数定義(END)
//----------------------------------------------------------------------
?>
