import stringHelper from "../db-queries/helpers/string_helper";

class QueryParser {
    formatAndCleanQuery(query) {
        query = stringHelper.replaceAll(query, /(\/\/|--).+/, "");
        query = query.replace(/\r?\n|\r/g, " ");
        query = query.trim();
        query = this.removeWrappedParenthesis(query);
        return query;
    }
}