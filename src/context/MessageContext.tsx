import React, { useContext, useState } from 'react';

export interface IMessageContext {
  message: string;
  open: boolean;
}

const INITIAL_VALUE: IMessageContext = {
  message: '',
  open: false,
};

const MessageContext = React.createContext<[IMessageContext, any]>([
  INITIAL_VALUE,
  () => {},
]);

const MessageProvider = (props: any) => {
  const [message, setMessage] = useState<IMessageContext>(INITIAL_VALUE);

  const { children } = props;

  return (
    <MessageContext.Provider value={[message, setMessage]}>
      {children}
    </MessageContext.Provider>
  );
};

export const UseMessageContext = () => useContext(MessageContext);

export { MessageContext, MessageProvider };
