
describe.only('fill sign-up genius', () => {
    beforeEach(() => {
      cy.visit('https://www.signupgenius.com/go/10C0E4CABAF22AAFBC25-stonecreek3')
      cy.get('.SUGbuttonContainer').then(() => {
          cy.get('input[type="checkbox"]').first().check()
          cy.get('#submitfooter input').click()
        })
    })
    
      it.only('should fill the form and submit', () => {       
        cy.get('#firstname').type('Phani')
        cy.get('#lastname').type('Kondapalli')
        cy.get('#email').type('something@gmail.com')
        cy.get('div.ng-scope div[data-ng-if*="address"] input').eq(0).type('my address line');
        cy.get('div.ng-scope div[data-ng-if*="address"] input').eq(2).type('Morrisville');
        cy.get('div.ng-scope div[data-ng-if*="address"] input').eq(3).type('27560');
        cy.get('#state_zip').select('string:NC',{force:true})
        cy.get('#phone_id').type('1626262626')
        cy.wait(5000)
        cy.get('div.ng-scope div[data-ng-if*="customFields.length"]').then(($customFields) => {
          if($customFields.find('input').length>0){
            $customFields.find('input').each(($el, index, $list)=>{
              switch($el.attr('type')){
                case 'radio': 
                cy.wrap($el).first().check({force:true})
                case 'text':
                cy.wrap($el).type('some value')  
              }
            })
          }
          var selectFieldsCount = $customFields.find('select').length
          if(selectFieldsCount===1){
            //cy.log(cy.get($customFields.find('select option')))
            cy.get($customFields.find('select')).select("No",{force:true})   
          }
          else if($selectFieldsCount>1){
            cy.log($customFields.find('select'))
            $customFields.find('select').each(($el, index, $list)=>{
             cy.wrap($el).select("No",{force:true})
            })
          }
        })
        cy.get('button[name="btnSignUp"]').click()
        cy.wait(3000)
      })
    })
  