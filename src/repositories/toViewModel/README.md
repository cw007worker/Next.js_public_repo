# フェッチしたデータからアプリケーションで使う形に変換を行う

```
const resToCartModels = (res: CartResponseType ): CartModels=>{
  ... 省略　...
  return {
    items
    updatedAt
    updatedAt
  }
}
```
