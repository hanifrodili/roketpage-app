<template lang="pug">
.toyyibpayCardDetails
  p.mb-4 This payment channel is not enabled by default to all toyyibPay merchants. Registered businesses or society organisations have to apply to enable this Payment Channel.
  div.table
    table(style='width:100%;text-align:center; height: 51px; border-collapse: separate; border-spacing: 0 5px;')
      tbody
        tr
          th(style='background-color:#614DC3; color:#FFFFFF; font-size:16px; width: 200px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | Provider
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; width: 385px; border: 1px solid white; padding:16px;', colspan='')
            img(alt='senangpay', src='https://toyyibpay.com/assets/img/icon/logo_senangpay.png', style='width: 119px; height: 50px;')
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; width: 385px; border: 1px solid white; padding:16px; border-bottom-right-radius: 10px; border-top-right-radius: 10px;', colspan='')
            img(alt='iserve', src='https://toyyibpay.com/assets/img/icon/logo_iserve.png', style=' height: 50px;')
        tr
          th(style='background-color:#614DC3; color:#FFFFFF; font-size:16px; width: 200px; padding:16px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | Eligible for
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; padding:16px; width: 385px; border: 1px solid white; border-bottom-right-radius: 10px; border-top-right-radius: 10px;', colspan='2')
            strong Business and Society organisations only.
            br
            p.font-italic.text-disabled Standard and Santai not applicable
        tr
          th(style='background-color:#614DC3; color:#FFFFFF; font-size:16px; width: 200px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | LOCAL CARDS
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:32px; width: 385px; border: 1px solid white; padding: 16px;')
            p(style='font-size:24px;') 2.55%
            p(style='font-size:16px;')  from transaction amount
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:32px; width: 385px; border: 1px solid white; padding: 16px; border-bottom-right-radius: 10px; border-top-right-radius: 10px;')
            p(style='font-size:24px;') 1.75%
            p(style='font-size:16px;')  from transaction amount
        tr
          th(style='background-color:#614DC3; color:#FFFFFF; font-size:16px; width: 200px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | INTERNATIONAL CARDS
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:32px; width: 385px; border: 1px solid white; padding: 16px;')
            p(style='font-size:24px;') 2.75%
            p(style='font-size:16px;')  from transaction amount
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:32px; width: 385px; border: 1px solid white; padding: 16px; border-bottom-right-radius: 10px; border-top-right-radius: 10px;')
            p(style='font-size:24px;') 2.35%
            p(style='font-size:16px;')  from transaction amount
        tr
          th(style='background-color:#614DC3; color:#FFFFFF; font-size:16px; width: 200px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | EWALLET
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:32px; width: 385px; border: 1px solid white; padding: 16px;')
            p(style='font-size:16px;') Not Applicable
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:32px; width: 385px; border: 1px solid white; padding: 16px; border-bottom-right-radius: 10px; border-top-right-radius: 10px;')
            p(style='font-size:24px;') 1.50%
            p(style='font-size:16px;')  from transaction amount
        tr
          th(style='background-color:#614DC3; color:#FFFFFF; font-size:16px; width: 200px; padding:16px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | Minimum Transaction
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; padding:16px; width: 385px; border: 1px solid white;', colspan='')
            p(style='font-size:24px;') RM40.00
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; padding:16px; width: 385px; border: 1px solid white; border-bottom-right-radius: 10px; border-top-right-radius: 10px;', colspan='')
            p(style='font-size:24px;') RM5.00
        tr
          th(style='background-color:#614DC3; color:#FFFFFF; font-size:16px; width: 200px; padding:16px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | Maximum Transaction
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; padding:16px; width: 385px; border: 1px solid white;', colspan='')
            p(style='font-size:24px;') RM30,000.00
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; padding:16px; width: 385px; border: 1px solid white; border-bottom-right-radius: 10px; border-top-right-radius: 10px;', colspan='')
            | Depends on payer&apos;s card limit.
        tr
          th(style='background-color:#614DC3; color:#FFFFFF; font-size:16px; width: 200px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | Settlement Period
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; padding:16px; width: 385px; border: 1px solid white;', colspan='')
            | Settlement made every Wednesday and Friday
            br
            i(style='font-size: 11px')
              a(href='https://guide.senangpay.my/settlement-schedule/', target='_blank')  (Click here for more info)
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; padding:16px; width: 385px; border: 1px solid white; border-bottom-right-radius: 10px; border-top-right-radius: 10px;', colspan='2')
            | Next 2 business days
            br
            | (T+2)
        tr
          th(style='background-color:#614DC3; color:#FFFFFF; font-size:16px; width: 200px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | Settlement Minimum Amount
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; padding:16px; width: 385px; border: 1px solid white;', colspan='')
            | RM100.00
            br
            i(style='font-size: 11px')
              | *If the settlement amount is less than RM100.00, the amount will be brought to next settlement cycle until the amount reached RM 100.00 or above
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; padding:16px; width: 385px; border: 1px solid white; border-bottom-right-radius: 10px; border-top-right-radius: 10px;', colspan='2')
            | Not Applicable
        tr
          th(style='background-color:#614DC3; color:#FFFFFF; font-size:16px; width: 200px; padding:16px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | Charging Method
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; padding:16px; width: 385px; border: 1px solid white; border-bottom-right-radius: 10px; border-top-right-radius: 10px;', colspan='2')
            | Deduct from Paid Amount
            br
            i(style='font-size: 11px') *Charge to customer is not available
        tr
          th(style='background-color:#614DC3; color:#FFFFFF ; font-size:16px; padding:16px; width: 200px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | Payment Method
          td(style='background-color:#F2F2F2; color:#4F4F4F; padding:16px; font-size:16px; width: 385px; border: 1px solid white; padding: 16px; border-bottom-right-radius: 10px; border-top-right-radius: 10px;', colspan='')
            img(alt='visa', src='https://toyyibpay.com/assets/img/icon/logo_visa.png', style='width: 96px; height: 30px;')
            |  
            img(alt='mastercard', src='https://toyyibpay.com/assets/img/icon/logo_mastercard.png', style='width: 37px; height: 30px; margin-left: 20px')
          td(style='background-color:#F2F2F2; color:#4F4F4F; padding:16px; font-size:16px; width: 385px; border: 1px solid white; padding: 16px; border-bottom-right-radius: 10px; border-top-right-radius: 10px;', colspan='')
            .grid-container.container1
              img.item1(alt='visa', src='https://toyyibpay.com/assets/img/icon/logo_visa.png', style='width: 62.06px; height: 20px;')
              img.item2(alt='touchngo', src='https://toyyibpay.com/assets/img/icon/paychannel/touchngo_logo.png', style='width: 30px; height: 30px; margin-top: 5px;')
              img.item3(alt='shopeepay', src='https://toyyibpay.com/assets/img/icon/paychannel/shopeepay_logo.png', style='width: 68.18px;height: 30px; margin-top: 5px;')
              img.item4(alt='zapp', src='https://toyyibpay.com/assets/img/icon/paychannel/zapp_logo.png', style='width: 28px; height: 30px; margin-top: 5px;')
              img.item5(alt='boost', src='https://toyyibpay.com/assets/img/icon/paychannel/boost_logo.png', style='width: 93.83px; height: 30px; margin-top: 5px;')
            .grid-container.container2
              img.item6(alt='mastercard', src='https://toyyibpay.com/assets/img/icon/logo_mastercard.png', style='width: 25.77px; height: 20px')
              img.item7(alt='alipay', src='https://toyyibpay.com/assets/img/icon/paychannel/alipay_logo.png', style='width: 28.26px; height: 30px; margin-top: 5px;')
              img.item8(alt='prestopay', src='https://toyyibpay.com/assets/img/icon/paychannel/prestopay_logo.png', style='width: 86.25px; height: 30px; margin-top: 5px;')
              img.item9(alt='grabpay', src='https://toyyibpay.com/assets/img/icon/paychannel/grabpay_logo.png', style='width: 34.628px; height: 30px; margin-top: 5px;')
              img.item10(alt='wechat', src='https://toyyibpay.com/assets/img/icon/paychannel/wechat_logo.png', style='width: 156.52px; height: 30px; margin-top: 5px;')
        tr
          th(style='background-color:#614DC3; font-size:16px; color:#FFFFFF; width: 200px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | Registration Fee
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; padding:16px; width: 385px; border: 1px solid white;', colspan='')
            | Not Applicable
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; padding:16px; width: 385px; border: 1px solid white; border-bottom-right-radius: 10px; border-top-right-radius: 10px;', colspan='2')
            | RM 200.00/registration
            br
            i(style='font-size: 11px') *Will be collected once your application approved by provider.
        tr
          th(style='background-color:#614DC3; font-size:16px; color:#FFFFFF; width: 200px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | Yearly Fee
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:24px; padding:16px; width: 385px; border: 1px solid white;', colspan='')
            | RM 500.00/year
            br
            i(style='font-size: 11px') *Will be collected once your application approved by provider.
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:24px; padding:16px; width: 385px; border: 1px solid white; border-bottom-right-radius: 10px; border-top-right-radius: 10px;', colspan='')
            | RM 360.00/year
            br
            i(style='font-size: 11px; line-height: 0px;')
              | *Starting on second year onwards, will be waived if collected RM 60,000 per year.
        tr
          th(style='background-color:#614DC3; font-size:16px; color:#FFFFFF; width: 200px; border: 1px solid white; padding: 16px; border-bottom-left-radius: 10px; border-top-left-radius: 10px;')
            | Register
          td(style='background-color:#F2F2F2; color:#4F4F4F; font-size:16px; padding:16px; width: 385px; border: 1px solid white;', colspan='')
            | Registration Temporarily Closed
          td(style='background-color:#F2F2F2; color:#4F4F4F; padding:16px; width: 385px; border: 1px solid white; border-bottom-right-radius: 10px; border-top-right-radius: 10px;', colspan='1')
            a(href='https://bit.ly/Card-Payment-i-Serve', target='_blank')
              v-btn(variant="outlined" style="width:100%; position:block; width:fit-content; height:fit-content") Register for<br>Business / Society
</template>

<script></script>

<style lang="scss">
div.table{
    width: -webkit-fill-available;
    padding: 0;
    overflow-x: scroll;
    position: relative;
}
th{
  position: sticky;
  left: 0;
  width: 150px !important;
  font-size: 12px !important;
}
td, td > *{
  font-size: 12px !important;
}
</style>
