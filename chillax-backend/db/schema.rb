# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_03_091823) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "composition_sounds", force: :cascade do |t|
    t.float "volume"
    t.bigint "sound_id", null: false
    t.bigint "composition_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["composition_id"], name: "index_composition_sounds_on_composition_id"
    t.index ["sound_id"], name: "index_composition_sounds_on_sound_id"
  end

  create_table "compositions", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_compositions_on_user_id"
  end

  create_table "sounds", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "image_url"
    t.string "sound_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "composition_sounds", "compositions"
  add_foreign_key "composition_sounds", "sounds"
  add_foreign_key "compositions", "users"
end
