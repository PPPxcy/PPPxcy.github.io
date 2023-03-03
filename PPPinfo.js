document.body.innerHTML = `<div class="head">
	<div class="head-info">
		<button class="head-button" type="button" style="width: 12vw;">
			PPPxcy 的主页
		</button>
		<a href="/">
			<button id="home" class="head-button" type="button" onmouseover="document.getElementById(&quot;home&quot;).style.backgroundColor = &quot;#0001&quot;;" onmouseout="document.getElementById(&quot;home&quot;).style.backgroundColor = &quot;#0000&quot;;">
				<img class="home icon" src="/home.png" alt="home" width="14" height="14"> 主页
			</button>
		</a>
	</div>
</div>
<center>
	<div class="main"></div>
</center>
<center>
	<div class="foot">
		本网页由
		<a href="https://github.com/PPPxcy" target="_blank" class="link">
			PPPxcy
		</a>
		创建
		<br>
		Created at March 2nd, 2023
	</div>
</center>`;
console.log(document.body.innerHTML);
$("div.main").load("main.txt");
