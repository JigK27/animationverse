ALTER TABLE "watchlists" RENAME TO "watchlist";--> statement-breakpoint
ALTER TABLE "watchlist" DROP CONSTRAINT "watchlists_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "watchlist" ADD CONSTRAINT "watchlist_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;