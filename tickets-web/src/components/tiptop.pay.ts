export default function processPayment(price: number, onSuccess: () => void, onError: () => void, onComplete: () => void)
{
    //@ts-ignore
    let widget = new tiptop.Widget({
        language: 'kk'
    });

    widget.pay('auth', // или 'charge'
        { //options
          publicId: 'test_api_00000000000000000000002', //id из личного кабинета
          description: 'Tickets payment GetTicket', //назначение
          amount: price, //сумма
          currency: 'KZT', //валюта
          accountId: 'user@example.com', //идентификатор плательщика (необязательно)
          invoiceId: '1234567', //номер заказа  (необязательно)
          skin: "classic", //дизайн виджета (необязательно)
          autoClose: 3
        }, {
          //@ts-ignore
          onSuccess: function(options) { // success
            onSuccess();
          },
          //@ts-ignore
          onFail: function(reason, options) { // fail
            onError();
          },
          //@ts-ignore
          onComplete: function(paymentResult, options) { //Вызывается как только виджет получает от api.tiptoppay ответ с результатом транзакции.
            onComplete();
          }
        }
      )
}