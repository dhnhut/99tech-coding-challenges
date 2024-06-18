import { useState } from "react";
import { useForm } from "react-hook-form";

import "./App.css";
import TokensList from "./components/TokenList";
import ConvertTokens from "./libs/convertTokens";

function App() {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const registerOptions = {
    baseAmount: {
      min: {
        value: 0,
        message: "Must be greater than 0",
      },
      required: true,
    },
    quoteAmount: {
      min: {
        value: 0,
        message: "Must be greater than 0",
      },
      required: true,
    },
  };

  const [baseToken, setBaseToken] = useState("ETH");
  const [quoteToken, setQuoteToken] = useState("BUSD");
  const [baseAmount, setBaseAmount] = useState(0);
  const [quoteAmount, setQuoteAmount] = useState(0);

  const convertFromBase = async (
    newBaseAmount = baseAmount,
    newBaseToken = baseToken
  ) => {
    const newQuoteAmount = await ConvertTokens(
      newBaseAmount,
      newBaseToken,
      quoteToken
    );

    setBaseAmount(newBaseAmount);
    setBaseToken(newBaseToken);
    setQuoteAmount(newQuoteAmount);
  };

  const convertFromQuote = async (
    newQuoteAmount = quoteAmount,
    newQuoteToken = quoteToken
  ) => {
    const newBaseAmount = await ConvertTokens(
      newQuoteAmount,
      newQuoteToken,
      baseToken
    );
    setQuoteAmount(newQuoteAmount);
    setQuoteToken(newQuoteToken);
    setBaseAmount(newBaseAmount);
  };

  // EventHandlers
  const handleBaseAmountChange = async (event) => {
    convertFromBase(parseFloat(event.target.value));
  };

  const handleQuoteAmountChange = async (event) => {
    convertFromQuote(parseFloat(event.target.value));
  };

  const handleBaseTokenChange = async (newBaseToken) => {
    convertFromBase(undefined, newBaseToken);
  };

  const handleQuoteQuoteChange = async (newQuoteToken) => {
    convertFromQuote(undefined, newQuoteToken);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://www.99tech.co/assets/img/99Tech.png"
            alt="Exchange Logo"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Exchange Tokens
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="baseAmount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <div className="mt-2 rounded-md shadow-sm">
                  <input
                    name="baseAmount"
                    {...register("baseAmount", registerOptions.baseAmount)}
                    type="number"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.00 - to convert"
                    onChange={handleBaseAmountChange}
                    value={baseAmount}
                  />
                </div>
                <div>
                  <small className="text-red-500">
                    {errors?.baseAmount?.message || <span>&nbsp;</span>}
                  </small>
                </div>
              </div>

              <div className="sm:col-span-3">
                <TokensList
                  label="From"
                  value={baseToken}
                  inputName="baseToken"
                  onChange={handleBaseTokenChange}
                />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="quoteAmount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <div className="mt-2 rounded-md shadow-sm">
                  <input
                    name="quoteAmount"
                    {...register("quoteAmount", registerOptions.quoteAmount)}
                    type="number"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.00 - to receive"
                    onChange={handleQuoteAmountChange}
                    value={quoteAmount}
                  />
                </div>
                <div>
                  <small className="text-red-500">
                    {errors?.quoteAmount?.message || <span>&nbsp;</span>}
                  </small>
                </div>
              </div>

              <div className="sm:col-span-3">
                <TokensList
                  label="To"
                  value={quoteToken}
                  inputName="quoteToken"
                  onChange={handleQuoteQuoteChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
