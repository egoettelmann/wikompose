# Standard Markdown notation

## Text basics
Use `*` to define text as *italic*, use `**` for **bold**, `_` and `__` do also work.

## Indentation
> Text can be indented with `>`
>> or even more indented with `>>`

## Titles
# Big title (h1) with `# Big title`
## Middle title (h2) with `## Middle title`
### Smaller title (h3) with `### Smaller title`
#### and so on (h4) with `#### and so on`
##### and so on (h5) with `##### and so on`

## Lists

 - bullets can be `-`, `+`, or `*`
 - bullet list 1
 - bullet list 2
    - sub item 1
    - sub item 2
        with indented text inside
 - bullet list 3
 + bullet list 4
 * bullet list 5

## Links

This is an [example inline link](http://lmgtfy.com/).
```md
[example inline link](http://lmgtfy.com/)
```

Links can also be reference based : [reference 1][ref1].
```md
[reference 1][ref1]

[ref1]:http://lmgtfy.com/
```

References are usually placed at the bottom of the document.

[ref1]:http://lmgtfy.com/

## Images

A sample image :

![revolunet logo](http://www.revolunet.com/static/parisjs8/img/logo-revolunet-carre.jpg "revolunet logo")

```md
![revolunet logo](http://www.revolunet.com/static/parisjs8/img/logo-revolunet-carre.jpg "revolunet logo")
```

## Code

It's quite easy to show code in markdown files.

Backticks can be used to `write inline code`.

To create a code block you have to wrap it with three backticks:

``````
```html
<script>
    document.location = 'http://lmgtfy.com/?q=markdown+cheat+sheet';
</script>
```
``````

Code blocks are automatically highlighted. The language can also be specified to adapt the highlighting.

```html
<script>
	document.location = 'http://lmgtfy.com/?q=markdown+cheat+sheet';
</script>
```

Some Python code :

```python
import random

class CardGame(object):
    """ a sample python class """
    NB_CARDS = 32
    def __init__(self, cards=5):
        self.cards = random.sample(range(self.NB_CARDS), 5)
        print 'ready to play'
```

Some Javascript code :

```js
var config = {
    duration: 5,
    comment: 'WTF'
}
// callbacks beauty un action
async_call('/path/to/api', function(json) {
    another_call(json, function(result2) {
        another_another_call(result2, function(result3) {
            another_another_another_call(result3, function(result4) {
                alert('And if all went well, i got my result :)');
            });
        });
    });
})
```

## Tables

Tables are rendered with the style of bootstrap tables.

| Left  align | Center align | Right align |  
| :---------- | :----------: | -----------:|  
| Apples      |       5      |       25,00 |  
| Oranges     |      15      |       30,00 |  
| Bananas     |      10      |       32,00 |  

Columns content can be aligned with `:`.

```md
| Left  align | Center align | Right align |  
| :---------- | :----------: | -----------:|  
| Apples      |       5      |       25,00 |  
| Oranges     |      15      |       30,00 |  
| Bananas     |      10      |       32,00 | 
```
