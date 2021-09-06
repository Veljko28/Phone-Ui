import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: {
            helpBar: {
              slogan: "Best Online Mobile Selling Store !"
            },
            mainHeader: {
              login: "Login",
              register: "Register",
              management: "Management",
              profile: "Profile",
              loyalityPoints: "You currently have {{points}} Loyality Points",
              search: "What are you looking for?"
            },
            navBar: {
              home: "Home",
              about: "About",
              phones: "Phones",
              bids: "Bids",
              contactus: "Contact Us"
            },
            notifications: {
              title: "Your Notifications",
              phone: "Your Phone Has Been Sold !",
              bid: "Your Bid Has Finished !",
              email: "Please Confirm Your Email !",
              emaildesc: "Validate your email entered on registration by confirm it",
              contact: "Click here and contact the buyer about the {{name}}",
              empty: "You currently have no notifications !"
            },
            latestProducts: {
              latestproducts: "Latest Products",
              featuredproducts: "Featured Products",
              relatedproducts: "Related Products"
            },
            subscribe: {
              title: "Subscribe To Get Discounts & Offers !",
              input: "Your Email",
              button: "Subscribe",
              success: "Successfully subscribed !",
              failed: "Failed to Subscribe !",
              invalid: "Invalid Email !"
            },
            subBar: {
              title1: "Safe Payment",
              desc1: "Use any valid credit card or paypal for your payment with no risks involved.",
              title2: "24/7 Support",
              desc2: "Contact our support team at any time of the day and get fast and reliable feedback about your problem.",
              title3: "Free & Easy Return",
              desc3: "If you are unsatisfied with your purchuse contact our support team and get your money back.",
              title4: "Affordable Items",
              desc4: "Find items under their ordinary price. New items are added every week and the best ones get sold quickly !"
            },
            numbersTab: {
              title: "MobiStore is a large company with",
              sold: "Phones Sold",
              active: "Active Users",
              coutries: "Countries"
            },
            welcomeTab: {
              welcome: "Welcome to MobiStore",
              about: " This is a website for selling and buying phones from other users or from the website owners themselves." +
                     "Here you can find the highest quality phones for cheap prices or buy used phones for need parts." +
                     "Our support team works 24/7 to deliver you the best customer service and you can get 100% money back guarantee.",
              mention: 
              "We are not associated with any of our users. Anything done by users that doesn't have anything to do with our website won't" +
              "be take in consideration by our support team. Please don't send unnecessary messages or you might get banned from the platform." +
              "Other acts that dont follow our Terms and Conditions will result in a temporary ban."       
            },
            category: {
              title1: "Category",
              title2: "Brand",
              title3: "Price",
              title4: "Sorting",
              all: "All",
              fields1: {
                all: "All Phones",
                other: "Others"
              },
              fields4: {
                none: "None",
                newer: "Date Created Newer",
                older: "Date Created Older",
                asc: "Price Ascending",
                desc: "Price Descending"
              }
            },
            contact: {
              title: "Contact Us",
              input1: "Your Name",
              input2: "Enter Your Email Address",
              input3: "Subject",
              input4: "Message",
              button: "Contact",
              success: "Successfully sent your message !",
              error: "Failed to send your message!"
            },
            contactInfo: {
              title: "Contact Info",
              subtitle1: "Corporate Headquater",
              subtitle2: "Sales Info & Inquiries",
              subtitle3: "Admin Contact",
              phone: "Phone"
            },
            contactSub: {
              title: "How Can We Help You ?",
              subtitle1: "Sales Inquiry",
              desc1: "If you have any questions about loyality points and the sales they provide contact our support team.",
              subtitle2: "24/7 Support",
              desc2: "Contact our support team at any time of the day and get fast and reliable feedback about your problem."
            }
        }
      }
    }
  });

export default i18n;