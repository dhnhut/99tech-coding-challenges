import TokensPriceApi from "./tokensPriceApi";

export default async function ConvertTokensApi(
  fromAmount,
  fromToken,
  toToken,
) {
  const tokensPrice = await TokensPriceApi();

  // console.log(`fromToken ${fromToken}`)
  // console.log(`toToken ${toToken}`)

  // console.log(`tokensPrice ${JSON.stringify(tokensPrice)}`)

  const fromPrice = tokensPrice.find((p) => p.currency === fromToken);
  const toPrice = tokensPrice.find((p) => p.currency === toToken);

  // console.log(`fromPrice ${JSON.stringify(fromPrice)}`)
  // console.log(`toPrice ${JSON.stringify(toPrice)}`)
  return fromPrice.price / toPrice.price * fromAmount;

}
