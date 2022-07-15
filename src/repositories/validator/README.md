# レスポンスのバリデートを zod を使って行う

```
import {
  getCartSchema,
  GetCartResponseType,
} from "....";

export const validateGetCartResponse = (data: unknown): GetCartResponseType => {
  const parsed = getCartSchema.parse(data);
  return parsed;
};
```
