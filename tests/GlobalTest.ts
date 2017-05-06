/**
 * Created by amatsegor on 5/5/17.
 */

import {Gs2File} from "../index";

export function globalTest(test){
    let transformer = Gs2File.fromGoogleSpreadsheet("1Ej7CiQpGUzbl2Ehb2P2cOpqBzhiWakFKJKW18uakZrw", '*');
    transformer.setKeyCol('KEY');

    transformer.save("results/values/strings.xml", { valueCol: "EN", format: "android" });
    transformer.save("results/values-bg/strings.xml", { valueCol: "BG", format: "android" });
    transformer.save("results/values-de/strings.xml", { valueCol: "DE", format: "android" });
    transformer.save("results/values-cs/strings.xml", { valueCol: "CZ", format: "android" });
    transformer.save("results/values-da/strings.xml", { valueCol: "DK", format: "android" });
    transformer.save("results/values-et/strings.xml", { valueCol: "EE", format: "android" });
    transformer.save("results/values-es/strings.xml", { valueCol: "ES", format: "android" });
    transformer.save("results/values-fi/strings.xml", { valueCol: "FI", format: "android" });
    transformer.save("results/values-fr/strings.xml", { valueCol: "FR", format: "android" });
    transformer.save("results/values-el/strings.xml", { valueCol: "GR", format: "android" });
    transformer.save("results/values-hu/strings.xml", { valueCol: "HU", format: "android" });
    transformer.save("results/values-it/strings.xml", { valueCol: "IT", format: "android" });
    transformer.save("results/values-lt/strings.xml", { valueCol: "LT", format: "android" });
    transformer.save("results/values-lv/strings.xml", { valueCol: "LV", format: "android" });
    transformer.save("results/values-nl/strings.xml", { valueCol: "NL", format: "android" });
    transformer.save("results/values-no/strings.xml", { valueCol: "NO", format: "android" });
    transformer.save("results/values-nb/strings.xml", { valueCol: "NO", format: "android" });
    transformer.save("results/values-pl/strings.xml", { valueCol: "PL", format: "android" });
    transformer.save("results/values-pt/strings.xml", { valueCol: "PT", format: "android" });
    transformer.save("results/values-ro/strings.xml", { valueCol: "RO", format: "android" });
    transformer.save("results/values-sv/strings.xml", { valueCol: "SE", format: "android" });
    transformer.save("results/values-sv-rSE/strings.xml", { valueCol: "SE", format: "android" });
    transformer.save("results/values-sl/strings.xml", { valueCol: "SI", format: "android" });
    transformer.save("results/values-sk/strings.xml", { valueCol: "SK", format: "android" });


    test.done()
}