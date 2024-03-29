import { UseAuth } from "../contexts/AuthContext";
import optionImages from "./ImportOptionsImgs";

export class Option_Structure {
    constructor(id, name, img, { link = '#', altImg = '', pointer = null, action = null, linkNoAuth = null }) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.link = link;
        this.altImg = altImg;
        this.pointer = pointer;
        this.action = action;
        this.linkNoAuth = linkNoAuth;
    }
}

const Options = () => {
    const { LogoutUser } = UseAuth();

    const OptionActions = {
        entrar: () => { console.log("Entrar") },
        minhaconta: () => { console.log("Minha Conta") },
        pedidos: () => { console.log("Meus Pedidos") },
        servicos: () => { console.log("Serviços") },
        atendimento: () => { console.log("Atendimento") },
        sair: () => { LogoutUser() },
    }

    return [
        new Option_Structure(0, "Entrar", optionImages.option_entrar, { link: "/login", altImg: "entrar_imagem", pointer: optionImages.option_pointer }),
        new Option_Structure(1, "Minha Conta", optionImages.option_minhaconta, { altImg: "minhaconta_imagem", pointer: optionImages.option_pointer }),
        new Option_Structure(2, "Meus Pedidos", optionImages.option_pedidos, { link: "#", linkNoAuth: "/register", altImg: "meuspedidos_imagem", pointer: optionImages.option_pointer, action: OptionActions.pedidos }),
        new Option_Structure(3, "Serviços", optionImages.option_servicos, { altImg: "serviços_imagem", pointer: optionImages.option_pointer, action: OptionActions.servicos }),
        new Option_Structure(4, "Atendimento e FAQ", optionImages.option_faq, { altImg: "atendimentoFAQ_imagem", pointer: optionImages.option_pointer, action: OptionActions.atendimento }),
        new Option_Structure(5, "hr", "", {}),
        new Option_Structure(6, "Sair", optionImages.option_sair, { altImg: "sair_imagem", pointer: optionImages.option_pointer, action: OptionActions.sair }),
    ]
}

export default Options;