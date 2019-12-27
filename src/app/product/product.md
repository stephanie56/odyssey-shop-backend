Enums and types of the objects include:

```typescript
  private mockProduct = {
    id: '1',
    categoryId: 'Souvenir',
    title: 'Mushroom Cushion Set',
    imgUrl: 'https://via.placeholder.com/500',
    count: 3,
    price: 10.25,
    description:
      'A tablecloth is also included, seriously what else do you need?',
    origin: 'Mushroom Kingdom',
  };
```

```typescript
export enum Category {
  Sticker = 'Sticker',
  Souvenir = 'Souvenir',
  Outfit = 'Outfit',
}
```

```typescript
export enum Origin {
  BOW = 'Bowser Kingdom',
  CAP = 'Cap Kingdom',
  CAS = 'Cascade Kingdom',
  CLO = 'Cloud Kingdom',
  DAK = 'Dark Side',
  LAK = 'Lake Kingdom',
  LOS = 'Lost Kingdom',
  LUN = 'Luncheon Kingdom',
  WOD = 'Wood Kingdom',
  MTR = 'Metro Kingdom',
  MSR = 'Mushroom Kingdom',
}
```
