

# 99Tech Problem 3: Messy React

## Code Review
- `sortedBalances` is memoized with `balances` and `prices` as dependencies, but `prices` is not used inside the `useMemo` callback function. This causes unnecessary recomputation whenever `prices` changes.
- `formattedBalances` are not used anywhere.
- Not sure `BoxProps` has `children` property
- `getPriority` should be moved out from the component. It is pure logic and does not relate to rendering. Moving it out to reduce logic and avoid unnecessary re-creating of the function every call.
- The `balances` implements `WalletBalance` interface (I assume that based on the name `useWalletBalances`) but its elements are cast to `FormattedWalletBalance` which has extra property, i.e. `formatted`. That property is used as props in `WalletRow` component. This may lead to potential errors due to missing values.
- `lhsPriority` is undefined, I gess it may be `balancePriority`.
- `WalletBalance` interface should have `blockchain` property.

## Refactoring

```Typescript
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added this field based on usage in the code
}

// Apply inheritance (optional)
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100;
    case 'Ethereum':
      return 50;
    case 'Arbitrum':
      return 30;
    case 'Zilliqa':
      return 20;
    case 'Neo':
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props; // not sure `BoxProps` has `children` property
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0; // instead of using lhsPriority
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return leftPriority > rightPriority ? -1 : leftPriority < rightPriority ? 1 : 0;
      });
  }, [balances]); // remove `prices`

  // comment out
  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed()
  //   }
  // })

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const formattedAmount = balance.amount.toFixed();
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formattedAmount} // instead of using balance.formatted
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};
```