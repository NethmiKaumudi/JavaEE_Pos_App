package util;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

public class ResponseUtil {
    public static JsonObject getJson(String state, String message, JsonArray... data) {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        builder.add("state", state);
        builder.add("message", message);
        if (data.length > 0) {
            builder.add("data", data[0]);

        } else {
            builder.add("data", "");
        }
        return builder.build();
    }
}
