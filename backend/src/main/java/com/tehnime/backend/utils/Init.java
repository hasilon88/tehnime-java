package com.tehnime.backend.utils;

import com.tehnime.backend.model.dto.user.SignUpDTO;
import com.tehnime.backend.services.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class Init implements CommandLineRunner {

    private final UserServiceImpl userServices;

    @Override
    public void run(String... args) throws Exception {
        insertData();
        //runCmdCommand("start msedge http://localhost:6969/swagger-ui/index.html");
        //runCmdCommand("start msedge http://localhost:6969/h2-console");
    }

    public void runCmdCommand(String command) throws IOException {
        Runtime.getRuntime().exec("cmd /c " + command);
    }

    public void insertData() {
        Map<String, List<?>> data = mockData();

        for (int i = 0; i < data.get("users").size(); i++) {
            userServices.createUser((SignUpDTO) data.get("users").get(i));
        }
    }

    public Map<String, List<?>> mockData() {
        List<SignUpDTO> mockUsersList = Arrays.asList(
                new SignUpDTO("John", "Doe", "john@email.com", "abc-123"),
                new SignUpDTO("Shaun", "Rosales", "angela35@hotmail.com", "home-761"),
                new SignUpDTO("Jacob", "Novak", "williamhenry@yahoo.com", "so-572"),
                new SignUpDTO("Amy", "Becker", "bortega@hotmail.com", "for-155"),
                new SignUpDTO("Dawn", "Wells", "karen00@valdez-hernandez.com", "adult-290"),
                new SignUpDTO("Kara", "Nguyen", "thomasjoseph@yahoo.com", "order-935"),
                new SignUpDTO("Corey", "Martin", "nancypowell@gmail.com", "should-351"),
                new SignUpDTO("Bradley", "Church", "amanda80@gmail.com", "watch-302"),
                new SignUpDTO("Daniel", "Walker", "moorekevin@gmail.com", "performance-952"),
                new SignUpDTO("Gabriel", "Martinez", "ayalajared@hotmail.com", "scientist-134"),
                new SignUpDTO("Shawn", "Delgado", "richelizabeth@gmail.com", "north-733"),
                new SignUpDTO("Kevin", "Gonzales", "jeremiahnelson@young-owen.org", "paper-429"),
                new SignUpDTO("John", "Roberts", "drandolph@hunter.org", "shake-734"),
                new SignUpDTO("Anthony", "Shah", "jpowell@yahoo.com", "tax-996"),
                new SignUpDTO("Allen", "Sandoval", "brittany01@hotmail.com", "already-724"),
                new SignUpDTO("Erika", "Farley", "owalters@wagner-gilmore.com", "as-863"),
                new SignUpDTO("Harjot", "Singh", "hasilon88@gmail.com", "Abc-123")
        );

        return new HashMap<String, List<?>>() {{
            put("users", mockUsersList);
        }};
    }
}
