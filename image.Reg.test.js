

import imagedx from "../pages/Imagelist1.page"
import { ImageList } from "../pages/ImageList.page";
import { imageDx } from "../pages/imageDx.page";

describe('implement cypress image list page object', () => {
    let implement = new imagedx()
    const imageListPage = new ImageList();



    it('Image links to view them in Image Viewer', () => {

        cy.visit('https://note-staging.revealbio.com/#/project/243169215/images')
        cy.get("input[name=username]").type("qa_admin");
        cy.get("input[name=password]").type("QApassa1"); //.type("{enter}");
        cy.get("button").contains("Log in").click();
        

       //implement.getimagelink(1) 
       // implement.serchboxonimagelist('Hello',0)   
       // implement.imageserchbox('hi')   
      // implement.addImage('SS20')
      // implement.removeimage('7031')
       //implement.selectAction('Download','SS20')
      // implement.selectAction('Delete')
      // implement.selectAction('Clone')
      implement.launchDigitalAssay()
    })
})
