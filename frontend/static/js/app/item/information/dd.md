
 # Mutation observer		# Mutation observer


 `MutationObserver` is a built-in object that observes a DOM element and fires a callback when it detects a change.		`MutationObserver` 는 DOM 요소를 관찰하고, 그것의 변화를 감지하였을때, 콜백을 실행시키는 내장객체입니다.


 We'll first take a look at the syntax, and then explore a real-world use case, to see where such thing may be useful.		우리는 우선 문법에 대해 살펴보고, 그 다음에 어느 부분에서 유용할 수 있을 지 보기 위하여, 실제 사용 사례를 살펴볼 것입니다.


 ## Syntax		## 문법
`MutationObserver` 는 사용하기 쉽습니다.


 `MutationObserver` is easy to use.		우선, 우리는 콜백함수와 함께 observer(관찰자)를 만들 것입니다.

 First, we create an observer with a callback-function:		


 ```js		```js
let observer = new MutationObserver(callback);		let observer = new MutationObserver(callback);
```		```


 And then attach it to a DOM node:		그리고 DOM 노드를 관찰합니다.(옵저버를 노드에 부착합니다) 


 ```js		```js
observer.observe(node, config);		observer.observe(node, config);
```		```


 `config` is an object with boolean options "what kind of changes to react on":		`config`은 "어떠한 종류의 변화에 반응할것인지"에 관한 불리언 옵션들을 갖춘 객체입니다.
- `childList` -- changes in the direct children of `node`,		
 - `subtree` -- in all descendants of `node`,		- `childList` -- `노드`의 직계 자식의 변화들에 대하여
- `attributes` -- attributes of `node`,		- `subtree` -- `노드`의 모든 자손들에 대하여
- `attributeFilter` -- an array of attribute names, to observe only selected ones.		- `attributes`-- `노드`의 속성들(attributes)에 대하여
- `characterData` -- whether to observe `node.data` (text content),		- `attributeFilter` -- 선택된 속성들 값만 관찰하기 위한 속성 이름들의 배열(배열에 있는 속성값의 이름만 관찰합니다)
- `characterData` -- `node.data`(텍스트 내용)를 관찰할 지

 \* 역자 주: characterData가 true여도 element.textContent ="어떤 문자열"의 변화를 감지하지 않습니다. characterData는 Node객체의 CharacterData타입 객체를 대상으로 합니다.
따라서 textContent, innerText등의 변화는 childList 내지는 subtree상에서의 Node의 추가,삭제(후술할 addedNodes,removeNodes)로 감지됩니다. characterData에 대해 한번 더 정리하자면,
감시 대상이 Element가 아니라 Node이고 해당 NodeValue의 CharacterData의 직접적인 변경이 대상입니다.\*

 몇 가지 다른 옵션들: 
- `attributeOldValue` -- `true`인 경우, 콜백 함수에게 속성의 새로운 값과 변경 전 값 모두가 전달됩니다. 그렇지 않으면 새로운 속성만이 전달됩니다(`attributes` 가 true인 경우)
- `characterDataOldValue` -- `true`인 경우, 콜백 함수에게 새로운 `node.data`의 값과 변경 전 값이 모두 전달됩니다, 그렇지 않으면 새로운 속성만이 전달됩니다(`characterData` 가 true인 경우)


 Few other options:		\* 역자 주: config에서 children, attributes, characterData 셋 중에 최소한 하나는 true로 설정되어야 합니다. 그렇지 않으면 Type error를 반환합니다. \*
- `attributeOldValue` -- if `true`, pass both the old and the new value of attribute to callback (see below), otherwise only the new one (needs `attributes` option),		
- `characterDataOldValue` -- if `true`, pass both the old and the new value of `node.data` to callback (see below), otherwise only the new one (needs `characterData` option).		


 Then after any changes, the `callback` is executed: changes are passed in the first argument as a list of [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects, and the observer itself as the second argument.		그 후 어떠한 변화가 발생하면,  `callback` 이 실행됩니다: 변화들은 [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord)의 배열로서 첫 번째 인수로 콜백에 전달됩니다. 
그리고 옵저버 자기자신이 두 번째 인수로서 전달됩니다.


 [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects have properties:		[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord)는 다음과 같은 프로퍼티들을 가지고 있습니다.


 - `type` -- mutation type, one of		- `type` -- 변화의 타입으로서 다음 중 하나
    - `"attributes"`: attribute modified		    - `"attributes"`: 속성(애트리뷰트)이 변경된 경우
    - `"characterData"`: data modified, used for text nodes,		    - `"characterData"`: text node의 데이터가 변경된 경우,
    - `"childList"`: child elements added/removed,		    - `"childList"`: 자식 요소들이 추가되거나 제거된 경우, 
- `target` -- where the change occurred: an element for `"attributes"`, or text node for `"characterData"`, or an element for a `"childList"` mutation,		- `target` -- 변화가 발생한 곳: `"attributes"` 속성들의 경우 엘리먼트(element)요소, `"characterData"` 의 경우 text node, `"childList"` 변경일시 엘리먼트(element)요소
- `addedNodes/removedNodes`  -- nodes that were added/removed,		- `addedNodes/removedNodes`  -- 추가되거나 제거된 노드들.
- `previousSibling/nextSibling` -- the previous and next sibling to added/removed nodes,		- `previousSibling/nextSibling` -- 추가되거나 제거된 노드들의 이전 혹은 다음 형제(자매)노드들.
- `attributeName/attributeNamespace` -- the name/namespace (for XML) of the changed attribute,		- `attributeName/attributeNamespace` -- 변경된 속성(attribute)의 이름(name) (XML의 경우, namespace),
- `oldValue` -- the previous value, only for attribute or text changes, if the corresponding option is set `attributeOldValue`/`characterDataOldValue`.		- `oldValue` -- 이전 속성의 값, 속성(attribute) 혹은 text의 변경인 경우에만 해당되며,  `attributeOldValue`/`characterDataOldValue` 옵션이 선택된 경우.


 For example, here's a `<div>` with a `contentEditable` attribute. That attribute allows us to focus on it and edit.		한 가지 예로서, `contentEditable` 속성을 가진 `<div>` 엘리먼트가 하나 있습니다. 해당 특성은 포커스를 가지게 하고, 편집을 가능하게 합니다.


 ```html run		```html run
<div contentEditable id="elem">Click and <b>edit</b>, please</div>		<div contentEditable id="elem">Click and <b>edit</b>, please</div>
 <script>		<script>
let observer = new MutationObserver(mutationRecords => {		let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)		  console.log(mutationRecords); // console.log(변경사항들)
});		});
 // observe everything except attributes		// 속성(애트리뷰트)들을 제외한 모든 것을 관찰합니다.
observer.observe(elem, {		observer.observe(elem, {
  childList: true, // observe direct children		  childList: true, // 직계 자식 요소를 관찰합니다
  subtree: true, // and lower descendants too		  subtree: true, // 더 낮은 단계의 자손들도 관찰합니다
  characterDataOldValue: true // pass old data to callback		  characterDataOldValue: true // 변경 전 데이터를 콜백 함수에게 전달합니다
});		});
</script>		</script>
```		```


 If we run this code in the browser, then focus on the given `<div>` and change the text inside `<b>edit</b>`, `console.log` will show one mutation:		브라우저 상에서 이 코드를 실행하고,  `<div>`요소에 포커스를 한 뒤, `<b>edit</b>` 내의 문자열을 바꾸면, `console.log`는 한 가지 변경사항을 보여줍니다. 

 ```js		```js
mutationRecords = [{		mutationRecords = [{
  type: "characterData",		  type: "characterData",
 @@ -75,82 +81,80 @@ mutationRecords = [{
  // other properties empty		  // other properties empty
}];		}];
```		```

 우리가 더 복잡한 편집을 하면, 예를 들어,  `<b>edit</b>`를 제거한다면, 변경(뮤테이션) 이벤트는 다수의 변경사항을 가지고 있을 수 있습니다.
If we make more complex editing operations, e.g. remove the `<b>edit</b>`, the mutation event may contain multiple mutation records:		

 ```js		```js
mutationRecords = [{		mutationRecords = [{
  type: "childList",		  type: "childList",
  target: <div#elem>,		  target: <div#elem>,
  removedNodes: [<b>],		  removedNodes: [<b>],
  nextSibling: <text node>,		  nextSibling: <text node>,
  previousSibling: <text node>		  previousSibling: <text node>
  // other properties empty		  // 다른 요소들은 비어있습니다
}, {		}, {
  type: "characterData"		  type: "characterData"
  target: <text node>		  target: <text node>
  // ...mutation details depend on how the browser handles such removal		  // 변경의 세부사항은 브라우져가 이러한 제거를 어떻게 다루는 가에 달려있습니다.
  // it may coalesce two adjacent text nodes "edit " and ", please" into one node		  // 브라우져는 수정된 두 개의 인접한 텍스트 노드들을 하나의 노드로 합칠 수도 있습니다.
  // or it may leave them separate text nodes		  // 또는 그것들을 분리된 텍스트 노드들로 둘 수도 있습니다.
}];		}];
```		```


 So, `MutationObserver` allows to react on any changes within DOM subtree.		따라서, `MutationObserver`는 DOM 서브트리 안에서의 어떠한 변경에도 반응하게 해줍니다.


 ## Usage for integration		## 통합을 위한 사례


 When such thing may be useful?		이러한 부분들이 언제 유용할 수 있을까요?


 Imagine the situation when you need to add a third-party script that contains useful functionality, but also does something unwanted, e.g. shows ads `<div class="ads">Unwanted ads</div>`.		당신이 유용한 기능을 가진 써드파티 스크립트를 추가하였는데,  원치 않는 것도 수행한다고 상상해봅시다. 예를 들어,  `<div class="ads">Unwanted ads</div>`와 같은 광고를 보여주는 경우입니다.


 Naturally, the third-party script provides no mechanisms to remove it.		당연히, 이 써드파티 스크립트는 그것을 제거할 어떠한 메커니즘도 제공하지 않습니다.


 Using `MutationObserver`, we can detect when the unwanted element appears in our DOM and remove it.		 `MutationObserver`를 사용함으로서, 우리는 우리가 원치않는 요소들이 우리의 DOM내에 언제 등장하는지를 감지할 수 있고, 그것을 제거할 수 있습니다.


 There are other situations when a third-party script adds something into our document, and we'd like to detect, when it happens, to adapt our page, dynamically resize something etc.		어떤 써드파티 스크립트가 우리의 HTML 문서 내에 무언가를 추가할 때, 그리고 우리가 그것을 감지하여 , 우리의 문서 내에 적용하기 위해 동적으로 resize하는 경우와 같은 다른 상황들이 있습니다,


 `MutationObserver` allows to implement this.		`MutationObserver` 는 이러한 것들을 구현하게 해줍니다.


 ## Usage for architecture		## 아키텍쳐를 위한 사례


 There are also situations when `MutationObserver` is good from architectural standpoint.		또한 `MutationObserver`가 아키텍쳐 관점에서 유용한 상황들이 있습니다.


 Let's say we're making a website about programming. Naturally, articles and other materials may contain source code snippets.		우리가 프로그래밍에 관한 웹사이트를 만드는 중이라고 합시다. 당연히, 글과 다른 요소들은 소스 코드 스니펫들을 가지고 있을 수 있습니다.


 Such snippet in an HTML markup looks like this:		HTML 마크업에서의 그러한 스니펫은 다음과 같은 모습입니다.


 ```html		```html
...		...
<pre class="language-javascript"><code>		<pre class="language-javascript"><code>
  // here's the code		  // 코드입니다.
  let hello = "world";		  let hello = "world";
</code></pre>		</code></pre>
...		...
```		```


 For better readability and at the same time, to beautify it, we'll be using a JavaScript syntax highlighting library on our site, like [Prism.js](https://prismjs.com/). To get syntax highlighting for above snippet in Prism, `Prism.highlightElem(pre)` is called, which examines the contents of such `pre` elements and adds special tags and styles for colored syntax highlighting into those elements, similar to what you see in examples here, on this page.		더 나은 가독성을 위해 동시에, 아름답게 꾸미기 위해, 우리는 우리의 사이트에 [Prism.js](https://prismjs.com/)와 같은 자바스크립트 문법 하이라이팅 라이브러리를 사용할 것입니다. Prism을 통해 위의 스니펫을 위한 문법 하이라이팅을 얻기 위해서, `Prism.highlightElem(pre)`이 호출됩니다. `pre`요소들을 검사한 뒤, 해당 요소들에 문법 하이라이팅을 위해 특별한 태그들와 스타일들을 추가합니다. 당신이 지금 이 페이지에서 보고 있는 예제들과 유사한 것들을 말이죠.


 When exactly should we run that highlighting method? Well, we can do it on `DOMContentLoaded` event, or put the script at the bottom of the page. The moment our DOM is ready, we can search for elements `pre[class*="language"]` and call `Prism.highlightElem` on them:		우리는 정확히 언제 하이라이팅 메써드를 실행해야 할까요? 음, 우리는 `DOMContentLoaded`을 통해서 혹은 페이지 하단에 스크립트를 추가할 수 있습니다. 우리의 DOM이 준비(ready)된 경우, 우리는`pre[class*="language"]`요소들을 찾아서, 그들을 대상으로 `Prism.highlightElem`을 호출할 수 있습니다.


 ```js		```js
// highlight all code snippets on the page		// 페이지 상의 모든 코드스니펫들에 대해서 하이라이팅(강조) 합니다.
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);		document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```		```


 Everything's simple so far, right? We find code snippets in HTML and highlight them.		모든 것이 지금까진 간단합니다. 그렇죠? 우리는 HTML에 상에서 코드 스니펫들을 찾아 그들을 강조하였습니다.


 Now let's go on. Let's say we're going to dynamically fetch materials from a server. We'll study methods for that [later in the tutorial](info:fetch). For now it only matters that we fetch an HTML article from a webserver and display it on demand:		계속해 봅시다. 우리가 서버로부터 동적으로 데이터들을 가지고 온다고 합시다. 우리는 fetch 메써드 [later in the tutorial](info:fetch)에 대해선 나중에 배울 것입니다. 현재로선 우리가 웹서버로부터 HTML article을 가져오고 요청에 따라 그것을 보여준다는 것이 중요합니다.


 ```js		```js
let article = /* fetch new content from server */		let article = /* fetch new content from server */
articleElem.innerHTML = article;		articleElem.innerHTML = article;
```		```


 The new `article` HTML may contain code snippets. We need to call `Prism.highlightElem` on them, otherwise they won't get highlighted.		새로운 HTML `article`은 코드 스니펫들을 가지고 있을 수 있습니다. 우리는 그것에 `Prism.highlightElem`호출해야 할 필요가 있습니다. 그렇지 않으면 강조(하이라이트)되지 않겠지요.


 **Where and when to call `Prism.highlightElem` for a dynamically loaded article?**		**언제 그리고 어디서 동적으로 불러온 article에 대해 `Prism.highlightElem` 를 호출해야 할까요?**


 We could append that call to the code that loads an article, like this:		우리는 다음과 같이 불러온 아티클을 HTML에 붙인 뒤, 호출을 할 수도 있습니다.


 ```js		```js
let article = /* fetch new content from server */		let article = /* fetch new content from server */
 @@ -163,37 +167,38 @@ snippets.forEach(Prism.highlightElem);
```		```


 ...But, imagine if we have many places in the code where we load our content - articles, quizzes, forum posts, etc. Do we need to put the highlighting call everywhere, to highlight the code in content after loading? That's not very convenient.		...But, imagine if we have many places in the code where we load our content - articles, quizzes, forum posts, etc. Do we need to put the highlighting call everywhere, to highlight the code in content after loading? That's not very convenient.
...하지만, 만약 우리가 코드 내에서 콘텐츠를 불러올 곳이 여러 곳이라고 상상해봅시다 - 글, 퀴즈, 포럼 게시물, 기타 등등. 우리는 모든 곳에서 콘텐츠를 불러온 뒤, 코드 스니펫를 하이라이팅하기 위해 코드를 실행시켜야 할 까요?  


 And what if the content is loaded by a third-party module? For example, we have a forum written by someone else, that loads content dynamically, and we'd like to add syntax highlighting to it. No one likes patching third-party scripts.		그리고 만약에 콘텐츠를 써드파티 모듈이 불러오는 경우는 어떤가요? 예를 들어, 우리는 다른 누군가에 의해 작성된 포럼이 있고, 동적으로 컨텐츠를 불러옵니다. 그리고 우리는 그것에 대해 하이라이팅을 하고 싶어합니다.
누구도 써드파티 스크립트를 수정하는 것을 좋아하지 않죠.


 Luckily, there's another option.		다행이, 다른 옵션이 있습니다.


 We can use `MutationObserver` to automatically detect when code snippets are inserted into the page and highlight them.		우리는 `MutationObserver`사용해 코드 스니펫들이 페이지에 삽입될 때 자동으로 감지하여 그들을 강조(하이라이트)할 수 있습니다.


 So we'll handle the highlighting functionality in one place, relieving us from the need to integrate it.		따라서 우리는 한 곳에서 하이라이팅 기능을 다룰 것이며, 그것(써드 파티 모듈)을 통합할 때 안심할 수 있습니다.


 ### Dynamic highlight demo		### 동적으로 하이라이트하는 데모


 Here's the working example.		여기 동작하는 예시가 하나 있습니다. 


 If you run this code, it starts observing the element below and highlighting any code snippets that appear there:		이 코드를 실행하면, 밑의 엘리먼트를 관찰하며 나타나는 어떠한 코드 스니펫이던지 하이라이팅하기 시작합니다.


 ```js run		```js run
let observer = new MutationObserver(mutations => {		let observer = new MutationObserver(mutations => {
   for(let mutation of mutations) {		  for(let mutation of mutations) {
    // examine new nodes, is there anything to highlight?		    // 하이라이트 할 것이 있는지,  새로운 노드들을 검사합니다, 
     for(let node of mutation.addedNodes) {		    for(let node of mutation.addedNodes) {
      // we track only elements, skip other nodes (e.g. text nodes)		      // 우리들은 엘리먼트(요소)들만 추적합니다, 텍스트 노드와 같은 다른 노드들은 생략합니다.
      if (!(node instanceof HTMLElement)) continue;		      if (!(node instanceof HTMLElement)) continue;
       // check the inserted element for being a code snippet		      // 삽입될 엘리먼트(요소)가 코드스니펫인지 확인합니다.
      if (node.matches('pre[class*="language-"]')) {		      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);		        Prism.highlightElement(node);
      }		      }
       // or maybe there's a code snippet somewhere in its subtree?		      // 서브트리 상에 다른 코드 스니펫이 있을 지도 확인합니다. 
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {		      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);		        Prism.highlightElement(elem);
      }		      }
 @@ -207,18 +212,17 @@ let demoElem = document.getElementById('highlight-demo');
observer.observe(demoElem, {childList: true, subtree: true});		observer.observe(demoElem, {childList: true, subtree: true});
```		```


 Here, below, there's an HTML-element and JavaScript that dynamically fills it using `innerHTML`.		이제 `innerHTML`을 통해서 HTML element와 자바스크립트 코드를 동적으로 삽입해 보겠습니다.

 우선은 이전의 코드(위에 있는 엘리먼트를 관찰하는)를 먼저 실행해주세요, 그리고 밑의 코드를 실행하는 겁니다. `MutationObserver`가 어떻게 스니펫을 감지하고 하이라이트하는지 보게 될 겁니다.
Please run the previous code (above, observes that element), and then the code below. You'll see how `MutationObserver` detects and highlights the snippet.		


 <p id="highlight-demo" style="border: 1px solid #ddd">A demo-element with <code>id="highlight-demo"</code>, run the code above to observe it.</p>		<p id="highlight-demo" style="border: 1px solid #ddd">A demo-element with <code>id="highlight-demo"</code>, run the code above to observe it.</p>


 The following code populates its `innerHTML`, that causes the `MutationObserver` to react and highlight its contents:		아래 코드는 `innerHTML`를 통해 엘리먼트에 스니펫을 추가하며, `MutationObserver`가 그에 반응하며 컨텐츠들을 하이라이트하게 합니다.


 ```js run		```js run
let demoElem = document.getElementById('highlight-demo');		let demoElem = document.getElementById('highlight-demo');
 // dynamically insert content with code snippets		// 동적으로 코드 스니펫들을 동반한 컨텐츠를 삽입.
demoElem.innerHTML = `A code snippet is below:		demoElem.innerHTML = `A code snippet is below:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>		  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Another one:</div>		  <div>Another one:</div>
 @@ -227,47 +231,42 @@ demoElem.innerHTML = `A code snippet is below:
  </div>		  </div>
`;		`;
```		```
우리는 이제 관찰대상인 엘리먼트들 혹은 `document`전체를 추적해 하이라이팅 할 수 있는 `MutationObserver`가 있습니다. 우리는 의식하지 않고 HTML상에 코드 스니펫들을 추가/ 삭제 할 수 있습니다.


 Now we have `MutationObserver` that can track all highlighting in observed elements or the whole `document`. We can add/remove code snippets in HTML without thinking about it.		## 추가적인 메써드들.

 ## Additional methods		

 There's a method to stop observing the node:		


 - `observer.disconnect()` -- stops the observation.		노드를 관찰하는 것을 멈추는 메써드가 있습니다.


 When we stop the observing, it might be possible that some changes were not yet processed by the observer. In such cases, we use		- `observer.disconnect()` -- 관찰을 중지합니다.


 - `observer.takeRecords()` -- gets a list of unprocessed mutation records - those that happened, but the callback has not handled them.		우리가 관찰을 중지할 때, 옵저버에 의해서 아직 처리되지 않은 몇몇 변화들이 있을 가능성이 있습니다. 그러한 경우에 우리는 아래 메써드를 사용할 수 있습니다.


 These methods can be used together, like this:		- `observer.takeRecords()` -- 변경이 발생하였지만, 콜백 함수에 의해 처리되지 않은 변경(뮤테이션) 기록의 배열을 가져옵니다.
이 메써드들은 다음과 같이 함께 사용될 수 있습니다. 


 ```js		```js
// get a list of unprocessed mutations		// 처리되지 않은 변경들의 배열을 가져옵니다
// should be called before disconnecting,		// 당신이 만약 처리되지 않은 최신 변경들에 관심이 있다면
// if you care about possibly unhandled recent mutations		// 옵저버와의 연결이 해제되기 전에 호출되어야 합니다.
let mutationRecords = observer.takeRecords();		let mutationRecords = observer.takeRecords();
 // stop tracking changes		// 변화를 추적하는 것을 중지합니다.
observer.disconnect();		observer.disconnect();
...		...
```		```



 ```smart header="`observer.takeRecords()`에 의해서 반환된 변경들은 프로세싱 큐에서 제거됩니다."
```smart header="Records returned by `observer.takeRecords()` are removed from the processing queue"		`observer.takeRecords()`에 의해서 반환된 변경들 대상에게는 콜백 함수가 호출이 되지 않습니다.
The callback won't be called for records, returned by `observer.takeRecords()`.		
```		```


 ```smart header="Garbage collection interaction"		```smart header="가비지 컬렉션에 대한 대응"
Observers use weak references to nodes internally. That is, if a node is removed from the DOM, and becomes unreachable, then it can be garbage collected.		옵저버들은 내부적으로 노드들에 대한 약한 참조를 사용합니다. 그에 따라, 노드가 DOM에서 제거되어 접근할 수 없게된다면, 그것은 가비지 콜렉션의 대상이 될 수 있습니다.
 The mere fact that a DOM node is observed doesn't prevent the garbage collection.		DOM노드가 관찰중이라는 것은 가비지 컬렉션으로부터 보호된다는 것은 아닙니다.
```		```
## 정리


 ## Summary  		`MutationObserver`는 DOM에서 일어난 변화들에 반응할 수 있습니다 - 속성들, 텍스트 컨텐츠 그리고 엘리먼트(요소)들의 추가와 삭제.

 우리는 써드파티 스크립트들을 통합하기 위해서 뿐만 아니라, 우리 코드의 다른 부분들에 의한 변화를 추적하기 위해 이것을 사용할 수 있습니다.
`MutationObserver` can react to changes in DOM - attributes, text content and adding/removing elements.		`MutationObserver`는 어떠한 변화이던지 추적할 수 있습니다. "무엇을 관찰할 지"에 대한 설정에서의 옵션들은 최적화를 위해 사용되며, 불필요한 콜백 함수 호출에 자원이 낭비되는 것을 막습니다.