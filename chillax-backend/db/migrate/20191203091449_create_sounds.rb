class CreateSounds < ActiveRecord::Migration[6.0]
  def change
    create_table :sounds do |t|
      t.string :name
      t.string :description
      t.string :image_url
      t.string :sound_url

      t.timestamps
    end
  end
end
