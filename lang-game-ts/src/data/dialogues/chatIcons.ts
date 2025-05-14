import alienNatural from "/assets/images/alien/messageIcons/alien/alien-nat.png";
import alienSmile1 from "/assets/images/alien/messageIcons/alien/alien-smile-1.png";
import alienSmile2 from "/assets/images/alien/messageIcons/alien/alien-smile-2.png";
import alienSad from "/assets/images/alien/messageIcons/alien/alien-sad.png";

export const chatIcons: Record<number, Record<number, string>> = {
    2: {
        1: alienNatural,
        2: alienSmile1,
        3: alienSmile2,
        4: alienSad
    }
};
